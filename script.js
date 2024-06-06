var profit = [];

function openPopUp() {
  document.getElementById("pop-up-menu").style.display = "flex";
}

function closePopUp() {
  document.getElementById("pop-up-menu").style.display = "none";
}

function saveData() {
  profit.push(Number(document.getElementById("price").value));
  document.getElementById("count").innerHTML = profit.length;
  document.getElementById("size_rod").innerHTML = profit;
  console.log(profit);
}

function submit() {
  let length = Number(document.getElementById("lengthRod").value);
  console.log(length);
  console.log(profit);
  document.getElementById("first-page").style.display = "none";
  document.getElementById("second-page").style.display = "block";
  if (document.getElementById("bruteforce").checked) {
    let startTime = performance.now();
    let result = bruteforce2(profit, length);
    let endTime = performance.now();
    let time = endTime - startTime;
    document.getElementById("profit").innerText = result.maxValue;
    let parse = [];
    parse = result.cuts[0];
    for (let i = 1; i < result.cuts.length; i++) {
      parse += ", " + result.cuts[i];
    }
    document.getElementById("piece").innerText = parse;
    console.log(time);
    document.getElementById("time").innerText = time;
  } else if (document.getElementById("dp").checked) {
    let startTime = performance.now();
    let result2 = DynamicProgramming(profit, length);
    let endTime = performance.now();
    let time = endTime - startTime;
    console.log(time);
    document.getElementById("profit").innerText = result2.maxValue;
    let parse = [];
    parse = result2.cuts[0];
    for (let i = 1; i < result2.cuts.length; i++) {
      parse += ", " + result2.cuts[i];
    }
    document.getElementById("piece").innerText = parse;
    document.getElementById("time").innerText = time;
  }
}

function back() {
  document.getElementById("first-page").style.display = "block";
  document.getElementById("second-page").style.display = "none";
}

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
  // looping untuk mengambil potongan yang sesuai pada profit
  while (size > 0) {
    cuts.push(s[size]);
    size = size - s[size];
  }

  return { maxValue: r[r.length - 1], cuts: cuts };
}
