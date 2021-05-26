import React from 'react'
import { Column } from 'react-table'
import i18n from 'i18n'
import { User } from 'types/user'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import CellLink from 'components/table/CellLink'
import routes from 'routes'
import { OwnerProperty } from 'types/property'
import { Customer } from 'types/customer'

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
    return <CellLink to={`${routes.users}/${original.id}`}>{value}</CellLink>
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
    return <CellLink to={`${routes.users}/${original.id}`}>{value}</CellLink>
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
    return <CellLink to={`${routes.customers}/${original.id}`}>{value}</CellLink>
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
  }) => <CellLink to={`${routes.properties}/${original.id}`}>{value}</CellLink>
}
export const ownerPropertyAddress: Column<OwnerProperty> = {
  Header: i18n.t('address'),
  accessor: (r: OwnerProperty) => `${r.property.address}, ${r.property.city} - ${r.property.state}`,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={`${routes.properties}/${original.id}`}>{value}</CellLink>
}
export const ownerPropertyProducerName: Column<OwnerProperty> = {
  Header: i18n.t('producerName'),
  accessor: (r: OwnerProperty) => r.property.producerName,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={`${routes.properties}/${original.id}`}>{value}</CellLink>
}
//#endregion
