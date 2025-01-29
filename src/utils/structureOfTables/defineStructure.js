/**
 * Generate the structure of the table
 * @param {*} columns Columns of the table
 */
export const columnGeneration = (columns) => {
  const headerStyleTable =
    'background-color: #fafafa; color: #757575; font-weight: 400; text-transform: uppercase; padding-top: 15px; padding-bottom: 15px; vertical-align: top;'

  // Add the rest of the properties in each "column" of the table

  return sortData(
    1,
    columns.map((column) => {
      return {
        ...column,
        field: 'field' in column ? column.field : column.name,
        sortable: 'sortable' in column ? column.sortable : true,
        align: 'align' in column ? column.align : 'left',
        headerStyle: headerStyleTable,
      }
    }),
  )
}

/**
 *
 * @param {*} type Type of data to sort
 * 0 => catalog
 * 1 => columns
 * @param {*} data
 * @returns
 */
function sortData(type, data) {
  try {
    return data.sort(function (a, b) {
      // Convertir el nombre a mayúsculas para ordenamiento sin distinción de mayúsculas y minúsculas
      var elementA = !type ? a.label.toUpperCase() : a.index
      var elementB = !type ? b.label.toUpperCase() : b.index

      if (elementA < elementB) {
        return -1
      }
      if (elementA > elementB) {
        return 1
      }
      return 0 // The names are the same
    })
  } catch (error) {
    console.error(error)
    return new Array()
  }
}
