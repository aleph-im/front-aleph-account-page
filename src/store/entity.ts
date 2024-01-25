import { RequestState } from '@aleph-front/core'
import { StoreReducer } from './store'

export type EntityState<T> = {
  keys: string[] | undefined
  entities: T[] | undefined
  loading: boolean
  error: Error | undefined
}

export const initialState: EntityState<never> = {
  keys: undefined,
  entities: undefined,
  loading: true,
  error: undefined,
}

export enum EntityActionType {
  ENTITY_SET = 'ENTITY_SET',
  ENTITY_LOAD = 'ENTITY_LOAD',
  ENTITY_SUCCESS = 'ENTITY_SUCCESS',
  ENTITY_ERROR = 'ENTITY_ERROR',
  ENTITY_ADD = 'ENTITY_ADD',
  ENTITY_DEL = 'ENTITY_DEL',
}

export class EntitySetAction<T> {
  readonly type = EntityActionType.ENTITY_SET
  constructor(public payload: { name: string; state: RequestState<T[]> }) {}
}

export class EntityLoadAction {
  readonly type = EntityActionType.ENTITY_LOAD
  constructor(public payload: { name: string }) {}
}

export class EntitySuccessAction<T> {
  readonly type = EntityActionType.ENTITY_SUCCESS
  constructor(public payload: { name: string; entities: T | T[] }) {}
}

export class EntityErrorAction {
  readonly type = EntityActionType.ENTITY_ERROR
  constructor(public payload: { name: string; error: Error }) {}
}

export class EntityAddAction<T> {
  readonly type = EntityActionType.ENTITY_ADD
  constructor(public payload: { name: string; entities: T | T[] }) {}
}

export class EntityDelAction {
  readonly type = EntityActionType.ENTITY_DEL
  constructor(public payload: { name: string; keys: string | string[] }) {}
}

export type EntityAction<T> =
  | EntitySetAction<T>
  | EntityLoadAction
  | EntitySuccessAction<T>
  | EntityErrorAction
  | EntityAddAction<T>
  | EntityDelAction

function addEntitiesToCollection<E>(
  entities: E[],
  collection: E[],
  key: keyof E,
): E[] {
  const map = new Map(collection.map((entity) => [entity[key], entity]))

  for (const entity of entities) {
    map.set(entity[key], entity)
  }

  return Array.from(map.values())
}

function addEntityToCollection<E>(
  entities: E | E[],
  collection: E[],
  key: keyof E,
): E[] {
  entities = Array.isArray(entities) ? entities : [entities]
  return addEntitiesToCollection(entities, collection, key)
}

function delEntityFromCollection<E>(
  ids: string | string[],
  collection: E[],
  key: keyof E,
): E[] {
  const idSet = new Set(Array.isArray(ids) ? ids : [ids])
  return collection.filter((e) => !idSet.has(e[key] as string))
}

function replaceCollection<E>(
  entities: E | E[],
  collection: E[],
  key: keyof E,
  virtualKey?: keyof E,
): E[] {
  entities = Array.isArray(entities) ? entities : [entities]

  collection = virtualKey
    ? collection.filter((e) => !e[virtualKey])
    : collection

  return addEntitiesToCollection(entities, collection, key)
}

function collectionKeys<E>(collection: E[], key: keyof E): string[] {
  return collection.map((e) => e[key] as string)
}

export type EntityReducer<T> = StoreReducer<EntityState<T>, EntityAction<T>>

export function getEntityReducer<E, K extends keyof E = keyof E>(
  name: string,
  key: K,
  virtualKey?: K,
): EntityReducer<E> {
  return (state = initialState, action) => {
    if (action.payload?.name !== name) return state

    switch (action.type) {
      case EntityActionType.ENTITY_SET: {
        const { data, ...rest } = action.payload.state

        const entities = data
        const keys = entities ? collectionKeys(entities, key) : undefined

        return {
          ...state,
          ...rest,
          entities,
          keys,
        }
      }

      case EntityActionType.ENTITY_LOAD: {
        return {
          ...state,
          loading: true,
          error: undefined,
        }
      }

      case EntityActionType.ENTITY_SUCCESS: {
        const entities = replaceCollection(
          action.payload.entities,
          state.entities || [],
          key,
          virtualKey,
        )

        const keys = collectionKeys(entities, key)

        return {
          ...state,
          keys,
          entities,
          loading: false,
          error: undefined,
        }
      }

      case EntityActionType.ENTITY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        }
      }

      case EntityActionType.ENTITY_ADD: {
        const entities = addEntityToCollection(
          action.payload.entities,
          state.entities || [],
          key,
        )

        const keys = collectionKeys(entities, key)

        return {
          ...state,
          keys,
          entities,
          loading: false,
          error: undefined,
        }
      }

      case EntityActionType.ENTITY_DEL: {
        const entities = delEntityFromCollection(
          action.payload.keys,
          state.entities || [],
          key,
        )

        const keys = collectionKeys(entities, key)

        return {
          ...state,
          keys,
          entities,
        }
      }

      default: {
        return state
      }
    }
  }
}
