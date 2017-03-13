const formatItem = type => (
  item => (
    {
      type,
      id: item.id,
      attributes: item,
    }
  )
);

export const formatForEmber = type => (
  array => ({
    data: array.map(formatItem(type)),
  })
);
