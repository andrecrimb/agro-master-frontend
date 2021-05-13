import React from 'react'
import { Column } from 'react-table'
import i18n from 'i18n'
import { User } from 'types/user'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'

//#region Users
export const usersName: Column<User> = {
  Header: i18n.t('name'),
  accessor: (r: User) =>
    r.nickname ? `${r.firstName} ${r.lastName} (${r.nickname})` : `${r.firstName} ${r.lastName}`
}
export const usersEmail: Column<User> = {
  Header: i18n.t('email'),
  accessor: 'email'
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
