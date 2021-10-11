const kmFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'narrow',
});

const mFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'unit',
  unit: 'meter',
  unitDisplay: 'narrow',
});

const formatDistance = (valueInM: number) => {
  if (valueInM < 999.5) {
    const roundedDistance = Math.round(valueInM);
    return mFormatter.format(roundedDistance);
  }

  const roundedDistance = parseFloat(Math.round(valueInM / 1000).toFixed(2));

  return kmFormatter.format(roundedDistance);
};

export default formatDistance;
