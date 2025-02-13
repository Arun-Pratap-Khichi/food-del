export const calculateDeliveryCost = (totalCartAmount) => {
    return totalCartAmount > 499 ? 0 : 49;
  };
  