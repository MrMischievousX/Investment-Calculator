export const baseUrl = 'https://dev-testnet.nordl.io/api';

/**
 * fetchPools
 * Api call to get list of pools
 *
 * @returns {array} - List of pools.
 */
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

/**
 * fetchPoolCalculator
 * Api call to get more details about asset timeline
 *
 * @param  {number} poolId PoolId of investment asset
 * @returns {object} - Timeline details for each pool index.
 */
export const fetchPoolCalculator = async (poolId: number) => {
  return fetch(`${baseUrl}/product/calculator-details/${poolId}`).then(res =>
    res.json(),
  );
};

/**
 * fetchInvestment
 * * Api call to get your investment results
 *
 * @param  {number} poolId PoolId of investment asset
 * @param  {number} frqInDays Freqyency of selected timeline in days
 * @param  {number} investmentCount Selected timeline index
 * @param  {number} sipAmount Choosed sip amount
 * @returns {object} - Investment results.
 */
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
