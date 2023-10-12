import { useState } from 'react'
import Head from 'next/head'
import { CCN, NodeManager } from '@/domain/node'
import { useRequest } from '@/hooks/common/useRequest'
import { Button, Tabs } from '@aleph-front/aleph-core'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import LinkedCell from '@/components/common/LinkedCell'
import ScoreCell from '@/components/common/ScoreCell'
import APYCell from '@/components/common/APYCell'
import StakedCell from '@/components/common/StakedCell'

export default function StakingPage() {
  const [tab, setTab] = useState('nodes')

  async function doRequest(): Promise<CCN[]> {
    const manager = new NodeManager({} as any)
    return await manager.getCCNNodes()
  }

  const { data } = useRequest({ doRequest, triggerOnMount: true })

  console.log(data)

  return (
    <>
      <Head>
        <title>Aleph.im | Account</title>
        <meta name="description" content="Aleph.im Account Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          Staking
        </h1>
        <div tw="mt-8 mb-14">
          <h2 className="tp-h7" tw="mb-0">
            What is staking?
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            aliquam lectus non eros malesuada egestas eu vitae ipsum. Donec sed
            faucibus sapien. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Aenean at scelerisque tortor. Sed nec placerat lacus.
            Fusce facilisis arcu in vulputate eleifend. Pellentesque at ante
            est. Vivamus cursus lorem odio. Aenean porttitor rutrum erat sed
            suscipit. Duis viverra, ligula et lacinia lobortis, sem ante luctus
            sapien, id gravida justo odio vel sapien. Ut vel volutpat mauris, in
            congue lorem. Etiam mollis, magna at finibus dictum, metus diam
            malesuada felis, at mattis magna lectus eget enim.
          </p>
        </div>
        <div tw="mt-14">
          <Tabs
            tabs={[
              { id: 'stake', name: 'My Stakes' },
              { id: 'nodes', name: 'All core nodes' },
            ]}
            align="left"
            selected={tab}
            onTabChange={setTab}
            tw="mb-8"
          />
          {tab === 'stake' ? (
            <>STAKE</>
          ) : (
            <>
              {!data ? (
                <>Loading...</>
              ) : (
                <NodesTable
                  columns={[
                    {
                      label: 'EST.APY',
                      width: '10%',
                      render: (row) => <APYCell node={row} nodes={data} />,
                    },
                    {
                      label: 'NAME',
                      width: '10%',
                      render: (row) => (
                        <NameCell
                          hash={row.hash}
                          name={row.name}
                          picture={row.picture}
                          locked={row.locked}
                        ></NameCell>
                      ),
                    },
                    {
                      label: 'STAKED',
                      width: '20%',
                      render: (row) => (
                        <StakedCell
                          staked={row.total_staked}
                          status={row.status}
                        />
                      ),
                    },
                    {
                      label: 'LINKED',
                      width: '10%',
                      render: (row) => (
                        <LinkedCell nodes={row.resource_nodes} />
                      ),
                    },
                    {
                      label: 'SCORE',
                      width: '20%',
                      render: (row) => <ScoreCell score={row.score} />,
                    },
                    {
                      label: '',
                      align: 'right',
                      width: '30%',
                      render: () => (
                        <div tw="flex gap-3 justify-end">
                          <Button
                            kind="neon"
                            size="regular"
                            variant="secondary"
                            color="main0"
                          >
                            Stake
                          </Button>
                          <Button
                            kind="neon"
                            size="regular"
                            variant="secondary"
                            color="main0"
                          >
                            Info
                          </Button>
                        </div>
                      ),
                    },
                  ]}
                  data={data}
                  borderType="solid"
                  oddRowNoise
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
