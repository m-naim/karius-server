module.exports = {
  getData: (pft) => ({
    ...pft._doc,
    total_value: pft.allocation.length > 0 ? pft.allocation.map((a) => a.total_value).reduce((a, b) => a + b) : 0,
    assetsNbr: pft.allocation.length,
    perf1M: pft.perfs.cum_1M.slice(-1)[0] - 1,
    perf6m: pft.perfs.cum_6M.slice(-1)[0] - 1,
    perf1y: pft.perfs.cum_1Y.slice(-1)[0] - 1,
    perf: pft.perfs.cum_All.slice(-1)[0] - 1,
  }),
};
