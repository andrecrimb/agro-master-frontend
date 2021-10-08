import React from 'react'
import { Column } from 'react-table'
import i18n from 'i18n'
import { User } from 'types/user'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import { Chip } from '@material-ui/core'
import CellLink from 'components/table/CellLink'
import routes from 'routes'
import { OwnerProperty } from 'types/property'
import { Customer, CustomerProperty } from 'types/customer'
import { addURLSearch, formatDate } from 'utils/utils'
import InfoTable from 'components/InfoTable'
import EditPropertyDialog from 'screens/Customers/EditPropertyButtonDialog'
import { Greenhouse, SeedlingBench } from 'types/greenhouse'
import EditBenchButtonDialog from 'screens/OwnerProperties/Greenhouses/EditBenchButtonDialog'
import EditPaymentButtonDialog from 'screens/Orders/EditPaymentButtonDialog'
import DeleteFruitsOrderItemButton from 'screens/Orders/DeleteFruitsOrderItemButton'
import DeleteSeedlingsOrderItemButton from 'screens/Orders/DeleteSeedlingsOrderItemButton'
import DeleteSeedsOrderItemButton from 'screens/Orders/DeleteSeedsOrderItemButton'
import DeleteRootstocksOrderItemButton from 'screens/Orders/DeleteRootstocksOrderItemButton'
import DeleteBorbulhasOrderItemButton from 'screens/Orders/DeleteBorbulhasOrderItemButton'
import {
  Payment,
  FruitOrderItem,
  Order,
  SeedOrderItem,
  RootstockOrderItem,
  BorbulhaOrderItem,
  SeedlingBenchOrderItem
} from 'types/orders'
import { Rootstock } from 'types/rootstock'
import NumberFormat from 'react-number-format'

//#region Users
export const usersName: Column<User> = {
  Header: i18n.t('name') + '',
  accessor: 'name',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={addURLSearch({ drawer: 'user', id: original.id + '' })}>{value}</CellLink>
  }
}
export const usersEmail: Column<User> = {
  Header: i18n.t('email') + '',
  accessor: 'email',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={addURLSearch({ drawer: 'user', id: original.id + '' })}>{value}</CellLink>
  }
}
export const usersActive: Column<User> = {
  Header: i18n.t('active') + '',
  accessor: 'active',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
export const usersSuperUser: Column<User> = {
  Header: i18n.t('superUser') + '',
  accessor: 'isSuperuser',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
//#endregion

//#region Customers
export const customersName: Column<Customer> = {
  Header: i18n.t('name') + '',
  accessor: (r: Customer) => (r.nickname ? `${r.name} (${r.nickname})` : `${r.name}`),
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
  Header: i18n.t('active') + '',
  accessor: 'active',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
//#endregion

//#region Rootstocks
export const rootstocksName: Column<Rootstock> = {
  Header: i18n.t('name') + '',
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
  Header: i18n.t('name') + '',
  accessor: (r: OwnerProperty) => r.property.name,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={addURLSearch({ drawer: 'property', id: original.id })}>{value}</CellLink>
}
export const ownerPropertyAddress: Column<OwnerProperty> = {
  Header: i18n.t('address') + '',
  accessor: (r: OwnerProperty) => `${r.property.address}, ${r.property.city} - ${r.property.state}`,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => <CellLink to={addURLSearch({ drawer: 'property', id: original.id })}>{value}</CellLink>
}
export const ownerPropertyProducerName: Column<OwnerProperty> = {
  Header: i18n.t('producerName') + '',
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
  Header: i18n.t('generalData') + '',
  accessor: (r: CustomerProperty) => r.property.name,
  Cell: ({
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
        [
          i18n.t('cep'),
          <NumberFormat
            displayType="text"
            key={'zip-' + data.property.zip}
            value={data.property.zip}
            format="#####-###"
          />
        ],
        [
          i18n.t('cnpj'),
          <NumberFormat
            displayType="text"
            key={'cnpj-' + data.property.cnpj}
            value={data.property.cnpj}
            format="##.###.###/####-##"
          />
        ],
        [
          i18n.t('ie'),
          <NumberFormat
            displayType="text"
            key={'ie-' + data.property.ie}
            value={data.property.ie}
            format="###.###.###.###"
          />
        ],
        [
          i18n.t('cpf'),
          <NumberFormat
            displayType="text"
            key={'cpf-' + data.property.cpf}
            value={data.property.cpf}
            format="###.###.###-##"
          />
        ],
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
  Header: i18n.t('name') + '',
  accessor: 'label',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return (
      <CellLink to={addURLSearch({ drawer: 'greenhouse', id: original.id + '' })}>{value}</CellLink>
    )
  }
}
export const greenhouseType: Column<Greenhouse> = {
  Header: i18n.t('greenhouse_type') + '',
  accessor: 'type',
  Cell: ({ value }) => {
    return <Chip label={i18n.t(value)} />
  }
}
export const greenhouseProperty: Column<Greenhouse> = {
  Header: i18n.t('property') + '',
  accessor: (r: Greenhouse) => r.ownerProperty.property.name,
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => {
    return <CellLink to={addURLSearch({ drawer: 'greenhouse', id: original.id })}>{value}</CellLink>
  }
}
//#endregion

//#region Benches
export const benchLabel: Column<SeedlingBench> = {
  Header: i18n.t('label') + '',
  accessor: 'label'
}
export const benchQuantity: Column<SeedlingBench> = {
  Header: i18n.t('quantity') + '',
  accessor: 'quantity',
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const benchLastPlantingDate: Column<SeedlingBench> = {
  Header: i18n.t('last_planting_date') + '',
  accessor: r => formatDate(r.lastPlantingDate, 'DD/MM/YYYY')
}
export const benchFirstPaymentDate: Column<SeedlingBench> = {
  Header: i18n.t('first_payment_date') + '',
  accessor: r => formatDate(r.firstPaymentDate, 'DD/MM/YYYY')
}
export const benchRootstock: Column<SeedlingBench> = {
  Header: i18n.t('rootstock') + '',
  accessor: r => r.rootstock.name
}
export const benchResponsible: Column<SeedlingBench> = {
  Header: i18n.t('responsible') + '',
  accessor: r => `${r.user.name}`
}
export const benchActions: Column<SeedlingBench> = {
  Header: ' ',
  id: 'benchActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <EditBenchButtonDialog bench={original} />
}
//#endregion

//#region Orders
export const orderNfNumber: Column<Order> = {
  Header: i18n.t('invoice_number') + '',
  accessor: 'nfNumber',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => (
    <CellLink to={addURLSearch({ drawer: original.type + 'Order', id: original.id + '' })}>
      {value}
    </CellLink>
  )
}
export const orderDate: Column<Order> = {
  Header: i18n.t('order_date') + '',
  accessor: r => formatDate(r.orderDate),
  id: 'orderDate',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => (
    <CellLink to={addURLSearch({ drawer: original.type + 'Order', id: original.id })}>
      {value}
    </CellLink>
  )
}
export const orderStatus: Column<Order> = {
  Header: i18n.t('status') + '',
  accessor: 'status',
  Cell: ({ value }) => <Chip label={i18n.t(value)} />
}
export const orderDeliveryDate: Column<Order> = {
  Header: i18n.t('delivery_date') + '',
  accessor: r => formatDate(r.deliveryDate),
  id: 'deliveryDate',
  Cell: ({
    value,
    cell: {
      row: { original }
    }
  }) => (
    <CellLink to={addURLSearch({ drawer: original.type + 'Order', id: original.id })}>
      {value}
    </CellLink>
  )
}
export const orderCustomer: Column<Order> = {
  Header: i18n.t('customer') + '',
  accessor: r => `${r.customerProperty.customer.name}`
}
export const fruitOrderBoxQtd: Column<Order> = {
  Header: i18n.t('box_quantity') + '',
  accessor: r => r.fruitOrderItems.reduce((prev, next) => prev + next.quantity, 0),
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const fruitOrderValue: Column<Order> = {
  Header: i18n.t('order_value') + '',
  accessor: r => r.fruitOrderItems.reduce((prev, next) => prev + next.quantity * next.boxPrice, 0),
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}

export const seedlingOrderValue: Column<Order> = {
  Header: i18n.t('order_value') + '',
  accessor: r =>
    r.seedlingBenchOrderItems.reduce((prev, next) => prev + next.quantity * next.unityPrice, 0),
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const seedlingOrderQtd: Column<Order> = {
  Header: i18n.t('seedling_quantity') + '',
  accessor: r => r.seedlingBenchOrderItems.reduce((prev, next) => prev + next.quantity, 0),
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}

export const borbulhaOrderValue: Column<Order> = {
  Header: i18n.t('order_value') + '',
  accessor: r =>
    r.borbulhaOrderItems.reduce((prev, next) => prev + next.quantity * next.unityPrice, 0),
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const borbulhaOrderQtd: Column<Order> = {
  Header: i18n.t('borbulha_quantity') + '',
  accessor: r => r.borbulhaOrderItems.reduce((prev, next) => prev + next.quantity, 0),
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}

export const seedOrderValue: Column<Order> = {
  Header: i18n.t('order_value') + '',
  accessor: r => r.seedOrderItems.reduce((prev, next) => prev + next.quantity * next.kgPrice, 0),
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const seedOrderQtd: Column<Order> = {
  Header: i18n.t('seed_quantity') + '',
  accessor: r => r.seedOrderItems.reduce((prev, next) => prev + next.quantity, 0),
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}

export const rootstockOrderValue: Column<Order> = {
  Header: i18n.t('order_value') + '',
  accessor: r =>
    r.rootstockOrderItems.reduce((prev, next) => prev + next.quantity * next.unityPrice, 0),
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const rootstockOrderQtd: Column<Order> = {
  Header: i18n.t('rootstock_quantity') + '',
  accessor: r => r.rootstockOrderItems.reduce((prev, next) => prev + next.quantity, 0),
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
//#endregion

//#region Payments
export const paymentsAmount: Column<Payment> = {
  Header: i18n.t('amount') + '',
  accessor: 'amount',
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const paymentsMethod: Column<Payment> = {
  Header: i18n.t('payment_method') + '',
  accessor: 'method',
  Cell: ({ value }) => <Chip label={i18n.t(value)} />
}
export const paymentsScheduledDate: Column<Payment> = {
  Header: i18n.t('scheduled_date') + '',
  accessor: (r: Payment) => formatDate(r.scheduledDate),
  id: 'scheduledDate'
}
export const paymentsReceived: Column<Payment> = {
  Header: i18n.t('received') + '',
  accessor: 'received',
  Cell: ({ value }) => (value ? <CheckIcon color="primary" /> : <CloseIcon color="error" />)
}
export const paymentsAction: Column<Payment> = {
  Header: ' ',
  id: 'paymentActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <EditPaymentButtonDialog payment={original} />
}
//#endregion

//#region FruitsOrderItems
export const fruitsOrderItemsName: Column<FruitOrderItem> = {
  Header: i18n.t('name') + '',
  accessor: 'name'
}
export const fruitsOrderItemsQuantity: Column<FruitOrderItem> = {
  Header: i18n.t('box_quantity') + '',
  accessor: 'quantity',
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const fruitsOrderItemsBoxPrice: Column<FruitOrderItem> = {
  Header: i18n.t('box_price') + '',
  accessor: 'boxPrice',
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const fruitsOrderItemsAction: Column<FruitOrderItem> = {
  Header: ' ',
  id: 'fruitsOrderItemsActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <DeleteFruitsOrderItemButton orderItem={original} />
}
//#endregion

//#region SeedsOrderItems
export const seedsOrderItemsName: Column<SeedOrderItem> = {
  Header: i18n.t('name') + '',
  accessor: 'name'
}
export const seedsOrderItemsQuantity: Column<SeedOrderItem> = {
  Header: i18n.t('seed_quantity') + '',
  accessor: 'quantity',
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const seedsOrderItemsKgPrice: Column<SeedOrderItem> = {
  Header: i18n.t('kg_price') + '',
  accessor: 'kgPrice',
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const seedsOrderItemsAction: Column<SeedOrderItem> = {
  Header: ' ',
  id: 'seedsOrderItemsActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <DeleteSeedsOrderItemButton orderItem={original} />
}
//#endregion

//#region RootstocksOrderItems
export const rootstocksOrderItemsName: Column<RootstockOrderItem> = {
  Header: i18n.t('name') + '',
  id: 'name',
  accessor: r => r.rootstock.name
}
export const rootstocksOrderItemsQuantity: Column<RootstockOrderItem> = {
  Header: i18n.t('rootstock_quantity') + '',
  accessor: 'quantity',
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const rootstocksOrderItemsKgPrice: Column<RootstockOrderItem> = {
  Header: i18n.t('unity_price') + '',
  accessor: 'unityPrice',
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const rootstocksOrderItemsAction: Column<RootstockOrderItem> = {
  Header: ' ',
  id: 'rootstocksOrderItemsActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <DeleteRootstocksOrderItemButton orderItem={original} />
}
//#endregion

//#region BorbulhasOrderItems
export const borbulhasOrderItemsName: Column<BorbulhaOrderItem> = {
  Header: i18n.t('name') + '',
  accessor: 'name'
}
export const borbulhasOrderItemsQuantity: Column<BorbulhaOrderItem> = {
  Header: i18n.t('borbulha_quantity') + '',
  accessor: 'quantity',
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const borbulhasOrderItemsKgPrice: Column<BorbulhaOrderItem> = {
  Header: i18n.t('unity_price') + '',
  accessor: 'unityPrice',
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const borbulhasOrderItemsAction: Column<BorbulhaOrderItem> = {
  Header: ' ',
  id: 'borbulhasOrderItemsActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <DeleteBorbulhasOrderItemButton orderItem={original} />
}
//#endregion

//#region SeedlingsOrderItems
export const seedlingsOrderItemsGhBench: Column<SeedlingBenchOrderItem> = {
  Header: `${i18n.t('greenhouse')} - ${i18n.t('bench')}`,
  id: 'greenhouseBench',
  accessor: r => `E.${r.seedlingBench.greenhouse.label} - B.${r.seedlingBench.label}`
}
export const seedlingsOrderItemsVariety: Column<SeedlingBenchOrderItem> = {
  Header: i18n.t('variety') + '',
  id: 'name',
  accessor: r => r.seedlingBench.rootstock.name
}
export const seedlingsOrderItemsQuantity: Column<SeedlingBenchOrderItem> = {
  Header: i18n.t('seedling_quantity') + '',
  accessor: 'quantity',
  Cell: ({ value }) => (
    <NumberFormat displayType="text" value={value} thousandSeparator="." decimalSeparator="," />
  )
}
export const seedlingsOrderItemsKgPrice: Column<SeedlingBenchOrderItem> = {
  Header: i18n.t('unity_price') + '',
  accessor: 'unityPrice',
  Cell: ({ value }) => (
    <NumberFormat
      displayType="text"
      value={value}
      prefix={'R$ '}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
export const seedlingsOrderItemsAction: Column<SeedlingBenchOrderItem> = {
  Header: ' ',
  id: 'seedlingsOrderItemsActions',
  Cell: ({
    cell: {
      row: { original }
    }
  }) => <DeleteSeedlingsOrderItemButton orderItem={original} />
}
//#endregion
