const value = document.querySelector(".balance");
const btnIn = document.querySelector(".in");
const btnOut = document.querySelector(".out");
const inDesc = document.querySelector(".inDesc");
const outDesc = document.querySelector(".outDesc");
const inValue = document.querySelector(".inValue");
const outValue = document.querySelector(".outValue");
const history = document.querySelector(".history-track");
let item = []; let obj = localStorage.getItem("Data");

//untuk mereset data menjadi sperti awal
const clear = document.getElementById("reset");
clear.addEventListener("click", ()=>{
    localStorage.clear();
});

// memasukan modal awal menggunakan prompt
insBalance = () =>{
    let insert = prompt("Input your current balance", "");
    return insert;
}

// mengecek localstorage apakah obj balance sudah ada atau belum
if(!localStorage.hasOwnProperty("Balance")){
    localStorage.setItem("Balance", insBalance())
}

// load and check from localstorage recently
// Jika data sudah ada maka bernilai true
if(obj){ 
    let parsing = JSON.parse(obj);
    for(let i of parsing){
        item.push(i);
    }
}else{
    // Membuat localStorage dengan nama "Data"
    localStorage.setItem("Data", item);
}

// penampung data yang masuk
localeDB = (e) => {

    //mengirim data ke array yang bervariabel item
    item.unshift(e); 
}

// ini adalah bagian income
btnIn.addEventListener("click", () => {
    // memanggil localeDB
    localeDB({
        deskripsi : inDesc.value,
        pendapatan : inValue.value,
        tanggal : new Date().toDateString() 
    }) 

    // membuat/mengupdate localstorage pada database
    localStorage.setItem("Data", JSON.stringify(item));
    inDesc.value = ""; // mengosongkan input field
    inValue.value = "";

    // memananggil fungsi untuk menampilkan balance
    showBalanceHistory();
});

// ini adalah bagian outcome
btnOut.addEventListener("click", () => {
    // memanggil localeDB
    localeDB({
        deskripsi : outDesc.value,
        // Dikurangi karena pengeluaran
        pendapatan : `-${outValue.value}`,
        tanggal : new Date().toDateString() 
    }) 

    // membuat/mengupdate localstorage pada database
    localStorage.setItem("Data", JSON.stringify(item));
    outDesc.value = ""; // mengosongkan input field
    outValue.value = "";

    // memananggil fungsi untuk menampilkan balance
    showBalanceHistory();
});

// mengakumulasi seluruh pemasukan dan pengeluaran
sumInOutcome = (bal) => {
    let sum = 0;
    for(let n of item){
        sum += parseInt(n.pendapatan);
    }
    return bal + sum;
}

// menampilkan dokumen html yang memiliki kelas balance
showBalanceHistory = () => {
    let currentBalance = parseInt(localStorage.Balance);
    value.innerHTML = `<h2>Rp. ${sumInOutcome(currentBalance)}</h2>`;

    // menampilkan history pengeluarn/pemasukan
    history.innerHTML = "" // untuk melakukan reset history
    for(let obj of item){
        history.innerHTML += 
        `<div class="data">
            <p>${obj.deskripsi}</p>
            <p>Rp. ${obj.pendapatan}</p>
            <p>${obj.tanggal}</p>
        </div>`
    }
};

// berfunsgi untuk menampilkan balance pada saat merefresh halaman
showBalanceHistory();


