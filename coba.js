function bruteforce2(price, size) {
  //base case mengembalikan max = 0 dan tidak ada potongan
  if (size <= 0) {
    return { maxValue: 0, cuts: [] };
  }
  //deklarasi max object yang berisi maxValue, dan variabel potongan
  let max = { maxValue: -Infinity, cuts: [] };
  //melakukan looping pada setiap harga rod
  for (let i = 0; i < size; i++) {
    //i merupakan potongan pertama pada rod
    //result merupakan potongan kedua
    //merekursif size hingga 0 untuk mencari maximum profit pada seluruh kemungkinan potongan
    //contohnya pada loop pertama potongan pertama adalah 1, maka pada result akan mencari kemungkinan potongan max profit dari sisa rod yaitu 9
    let result = bruteforce2(price, size - i - 1);
    //newValue adalah variabel setelah result telah mendapatkan max profitnya
    //contoh jika potongan pertama maka price 1 + maxvalue (yang didapat dari rekursif sebelumnya)
    let newValue = price[i] + result.maxValue;
    //membandingkan newValue dengan var global yaitu max
    //contoh jika pada loop pertama lebih besar maka newValue akan menjadi max baru
    //dan array cut akan concat dengan result pada max, contoh 1 diconcat menuju cuts yg berisi array [1,1,6] dari max rekursif
    if (newValue > max.maxValue) {
      max = { maxValue: newValue, cuts: [i + 1].concat(result.cuts) };
    }
  }
  return max;
}
/*
function DynamicProgramming(price, size) {
  let r = [];
  let s = [];
  r[0] = 0;
  for (let j = 1; j <= size; j++) {
    let max = 0;
    for (let i = 0; i < j; i++) {
      if (max < price[i] + r[j - i - 1]) {
        max = price[i] + r[j - i - 1];
        s[j] = i + 1;
      }
    }
    r[j] = max;
  }
  return { maxValue: r[r.length - 1], cuts: s };
}
*/

function DynamicProgramming(price, size) {
  //deklarasi r yang berisi max profit dan s yang berisi potongan yang dipilih
  let r = new Array(size + 1).fill(0);
  let s = new Array(size + 1).fill(0);

  //loop untuk memulai pemotongan yang memiliki panjang j
  for (let j = 1; j <= size; j++) {
    //deklarasi max = 0
    let max = 0;
    //loop kedua untuk mencari potongan kedua
    for (let i = 0; i < j; i++) {
      //jika max < price+r maka max akan diassign price + r
      //dan s[j] akan berisi size sesuai profit tersebut
      if (max < price[i] + r[j - i - 1]) {
        max = price[i] + r[j - i - 1];
        s[j] = i + 1;
      }
    }
    r[j] = max;
  }
  let cuts = [];
  while (size > 0) {
    cuts.push(s[size]);
    size = size - s[size];
  }

  return { maxValue: r[r.length - 1], cuts: cuts };
}

let price = [2, 5, 13, 12, 15, 16, 25, 42, 52, 61];
let size = price.length;
console.time("bruteforce2");
let result = bruteforce2(price, 15);
console.timeEnd("bruteforce2");
console.log("Maximum Obtainable Value with Bruteforce is " + result.maxValue);
console.log("Cuts: " + result.cuts);
console.time("Dp");
let result2 = DynamicProgramming(price, 15);
console.timeEnd("Dp");
console.log(
  "Maximum Obtainable Value with Dynamic Programming is " + result2.maxValue
);
console.log("Cuts: " + result2.cuts);
