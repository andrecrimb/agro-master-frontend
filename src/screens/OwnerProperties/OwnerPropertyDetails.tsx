import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useOwnerProperty from 'hooks/useOwnerProperty'
import NumberFormat from 'react-number-format'
import CleanAccordion from 'components/CleanAccordion'
import useGreenhouses from 'hooks/useGreenhouses'
import BenchesTable from 'screens/OwnerProperties/greenhouses/BenchesTable'
import EditGreenhouseButtonDialog from 'screens/OwnerProperties/greenhouses/EditGreenhouseButtonDialog'
import AddBenchButtonDialog from 'screens/OwnerProperties/greenhouses/AddBenchButtonDialog'
import EditPropertyButtonDialog from 'screens/OwnerProperties/EditPropertyButtonDialog'
import AddGreenhouseButtonDialog from 'screens/OwnerProperties/greenhouses/AddGreenhouseButtonDialog'

type Props = { id: number }

const OwnerPropertyDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data } = useOwnerProperty(id)
  const { data: greenhouses = [] } = useGreenhouses({ ownerPropertyId: id })

  const greenhousesTabs = React.useMemo(() => {
    return greenhouses.map(greenhouse => ({
      label: greenhouse.label,
      component: (
        <>
          <CleanAccordion
            id={greenhouse.label + greenhouse.type + 'greenhouse_general_data'}
            header={t('greenhouse_general_data')}
            actions={<EditGreenhouseButtonDialog ownerPropertyId={id} greenhouse={greenhouse} />}
          >
            <InfoTable
              entries={[
                [t('name'), greenhouse.label],
                [t('greenhouse_type'), t(greenhouse.type)]
              ]}
            />
          </CleanAccordion>
          {greenhouse.type === 'seedling' ? (
            <CleanAccordion
              actions={<AddBenchButtonDialog greenhouse={greenhouse} />}
              childrenPadding={false}
              id={greenhouse.label + greenhouse.type + 'benches'}
              header={t('bench_plural')}
            >
              <BenchesTable greenhouse={greenhouse} />
            </CleanAccordion>
          ) : null}
        </>
      )
    }))
  }, [greenhouses])

  if (!data) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('property') + ' | ',
        highlightTitle: data.property.name,
        RightActions: <AddGreenhouseButtonDialog ownerProperty={data} />
      }}
      tabs={[
        {
          label: t('general'),
          component: (
            <CleanAccordion
              id="generalData"
              header={t('generalData')}
              actions={<EditPropertyButtonDialog ownerProperty={data} />}
            >
              <InfoTable
                entries={[
                  [t('name'), data.property.name],
                  [
                    t('address'),
                    `${data.property.address}, ${data.property.city}-${data.property.state}`
                  ],
                  [
                    t('cep'),
                    <NumberFormat
                      displayType="text"
                      key={'zip-' + data.property.zip}
                      value={data.property.zip}
                      format="#####-###"
                    />
                  ],
                  [
                    t('cnpj'),
                    <NumberFormat
                      displayType="text"
                      key={'cnpj-' + data.property.cnpj}
                      value={data.property.cnpj}
                      format="##.###.###/####-##"
                    />
                  ],
                  [
                    t('ie'),
                    <NumberFormat
                      displayType="text"
                      key={'ie-' + data.property.ie}
                      value={data.property.ie}
                      format="###.###.###.###"
                    />
                  ],
                  [
                    t('cpf'),
                    <NumberFormat
                      displayType="text"
                      key={'cpf-' + data.property.cpf}
                      value={data.property.cpf}
                      format="###.###.###-##"
                    />
                  ],
                  [t('producer'), data.property.producerName]
                ]}
              />
            </CleanAccordion>
          )
        },
        ...greenhousesTabs
      ]}
    />
  )
}

export default OwnerPropertyDetails
