export const getColorOpacity = (value) => {
    let opacity = 1;
  
    if (value === 0) {
      opacity = 0;
    } else if (value >= 1 && value <= 100) {
      opacity = 0.2;
    } else if (value >= 101 && value <= 1000) {
      opacity = 0.4;
    } else if (value >= 1001 && value <= 2000) {
      opacity = 0.6;
    } else {
      opacity = 1;
    }    
  
    return opacity;
  };