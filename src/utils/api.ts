export const baseUrl = 'https://dev-testnet.nordl.io/api';

export const fetchPools = async () => {
  try {
    const data = await fetch(`${baseUrl}/product/all-pools`).then(response =>
      response.json(),
    );
    const jsonData = await data;
    return jsonData?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchPoolCalculator = async (poolId: number) => {
  return fetch(`${baseUrl}/product/calculator-details/${poolId}`).then(res =>
    res.json(),
  );
};

export const fetchInvestment = async (
  poolId: number,
  frqInDays: number,
  investmentCount: number,
  sipAmount: number,
) => {
  var raw = {
    poolId,
    frqInDays,
    investmentCount,
    sipAmount,
  };

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions: any = {
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow',
    headers: myHeaders,
  };

  try {
    const data = await fetch(
      `${baseUrl}/product/calculator-for-pool`,
      requestOptions,
    ).then(response => response.json());
    const jsonData = await data;
    return jsonData?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
