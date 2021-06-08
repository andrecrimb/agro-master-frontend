import React from 'react'
import { Column } from 'react-table'
import i18n from 'i18n'
import { User } from 'types/user'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import CellLink from 'components/table/CellLink'
import routes from 'routes'
import { OwnerProperty } from 'types/property'
import { Customer, CustomerProperty } from 'types/customer'
import { addURLSearch } from 'utils/utils'
import InfoTable from 'components/InfoTable'
import EditPropertyDialog from 'screens/Customers/EditPropertyButtonDialog'
import { Greenhouse } from 'types/greenhouse'

//#region Users
export const usersName: Column<User> = {
  Header: i18n.t('name'),
  accessor: (r: User) =>
    r.nickname ? `${r.firstName} ${r.lastName} (${r.nickname})` : `${r.firstName} ${r.lastName}`,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={addURLSearch({ drawer: 'user', id: original.id })}>{value}</CellLink>
  }
}
export const usersEmail: Column<User> = {
  Header: i18n.t('email'),
  accessor: 'email',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={addURLSearch({ drawer: 'user', id: original.id })}>{value}</CellLink>
  }
}
export const usersActive: Column<User> = {
  Header: i18n.t('active'),
  accessor: 'active',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
export const usersSuperUser: Column<User> = {
  Header: i18n.t('superUser'),
  accessor: 'isSuperuser',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
//#endregion

//#region Customers
export const customersName: Column<Customer> = {
  Header: i18n.t('name'),
  accessor: (r: Customer) =>
    r.nickname ? `${r.firstName} ${r.lastName} (${r.nickname})` : `${r.firstName} ${r.lastName}`,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={addURLSearch({ drawer: 'customer', id: original.id })}>{value}</CellLink>
  }
}
export const customersActive: Column<Customer> = {
  Header: i18n.t('active'),
  accessor: 'active',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
//#endregion

//#region Rootstocks
export const rootstocksName: Column<Customer> = {
  Header: i18n.t('name'),
  accessor: 'name',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={`${routes.rootstocks}/${original.id}`}>{value}</CellLink>
  }
}
//#endregion

//#region Owner Properties
export const ownerPropertyName: Column<OwnerProperty> = {
  Header: i18n.t('name'),
  accessor: (r: OwnerProperty) => r.property.name,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={addURLSearch({ drawer: 'property', id: original.id })}>{value}</CellLink>
}
export const ownerPropertyAddress: Column<OwnerProperty> = {
  Header: i18n.t('address'),
  accessor: (r: OwnerProperty) => `${r.property.address}, ${r.property.city} - ${r.property.state}`,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={addURLSearch({ drawer: 'property', id: original.id })}>{value}</CellLink>
}
export const ownerPropertyProducerName: Column<OwnerProperty> = {
  Header: i18n.t('producerName'),
  accessor: (r: OwnerProperty) => r.property.producerName,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={addURLSearch({ drawer: 'property', id: original.id })}>{value}</CellLink>
}
//#endregion

//#region Customer Properties
export const customerPropertyGeneral: Column<CustomerProperty> = {
  Header: i18n.t('generalData'),
  accessor: (r: CustomerProperty) => r.property.name,
  Cell: ({
    value,
    cell: {
      row: { original: data }
    }
  }) => (
    <InfoTable
      entries={[
        [i18n.t('name'), data.property.name],
        [
          i18n.t('address'),
          `${data.property.address}, ${data.property.city}-${data.property.state}`
        ],
        [i18n.t('cep'), data.property.zip],
        [i18n.t('cnpj'), data.property.cnpj],
        [i18n.t('cpf'), data.property.cpf],
        [i18n.t('producer'), data.property.producerName]
      ]}
    />
  )
}
export const customerPropertyEdit: Column<CustomerProperty> = {
  Header: '',
  id: 'customerPropertyEdit',
  Cell: ({
    cell: {
      row: { original: data }
    }
  }) => <EditPropertyDialog property={data.property} customerId={data.customerId} />
}

//#endregion

//#region Greenhouses
export const greenhouseLabel: Column<Greenhouse> = {
  Header: i18n.t('name'),
  accessor: 'label',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={`${routes.greenhouses}/${original.id}`}>{value}</CellLink>
  }
}
export const greenhouseProperty: Column<Greenhouse> = {
  Header: i18n.t('property'),
  accessor: (r: Greenhouse) => r.ownerProperty.property.name,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={`${routes.greenhouses}/${original.id}`}>{value}</CellLink>
  }
}
//#endregion
