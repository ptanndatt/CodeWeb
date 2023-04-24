const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var datLich = $('#datlich');
var modal = $('.modal1');
var close = $('.close');
var close = $('.close');
var btn_close = $('#btn-close');
var btn_addVaoBang = $('#btn-datlich');
var modal_container = $('.modal-container');
var tbody = $('tbody');
var chuyenKhoaSelect = $('#txt-chuyenkhoa');
var chkList = $$('input[type="checkbox"]');
var data = [];

function render() {
    var tables = '';
    for(var key in data) {
        tables += `
        <tr>
            <td>${Number(key) + 1}</td>
            <td>${data[key].Ma}</td>
            <td>${data[key].MatKhau}</td>
            <td>${data[key].NgayKham}</td>
            <td>${data[key].PhuThu}</td>
            <td>${data[key].ChuyenKhoa}</td>
            <td>
                <button class="butt" onclick="delete_item(${key})">Delete</button>
                <button class="butt" onclick="edit_item(${key})">Edit</button>
            </td>
        </tr>
        `;
    }
    tbody.innerHTML = tables;
}


function delete_item(i) {
   data.splice(i, 1);
    render();
}

function edit_item(i) {
    modal.classList.add('show');
    $('#txt-mabenhnhan').value = data[i].Ma;
    $('#txt-matkhau').value = data[i].MatKhau;
    $('#txt-date').value = data[i].NgayKham;
    chuyenKhoaSelect.selectedIndex = 0;
    for (var value of data[i].ListCheckbox) {
        chkList[value].checked = true;
    }
}

function clearInput() {
    $('#txt-mabenhnhan').value = "";
    $('#txt-matkhau').value = "";
    $('#txt-date').value = "";
    chuyenKhoaSelect.selectedIndex = 0;
    for (var chk of chkList) {
        chk.checked = false;
    }
}


datLich.addEventListener('click', () => {
    modal.classList.add('show')
});

close.addEventListener('click', () => {
    modal.classList.remove('show');
    clearInput();
});

btn_close.addEventListener('click', () => {
    modal.classList.remove('show');
    clearInput();
});

modal.addEventListener('click', (e) => {
   if (!modal_container.contains(e.target)) {
       btn_close.click();
   }
});

btn_addVaoBang.addEventListener('click', (e) => {

   var chuyenKhoaSelect = $('#txt-chuyenkhoa');
   var chkList = $$('input[type="checkbox"]')

   var ma = $('#txt-mabenhnhan').value;
   var matKhau = $('#txt-matkhau').value;
   var ngayKham = $('#txt-date').value;
   var chuyenKhoa = chuyenKhoaSelect.options[chuyenKhoaSelect.selectedIndex].value;
   var phuThu = 0;
    for (var chk of chkList) {
        if (chk.checked) {
            phuThu += 500000;
        }
    }
    var listCheckbox = [];
    for (var key in chkList) {
        if (chkList[key].checked) {
            listCheckbox.push(key);
        }
    }
    var item = {
        Ma: ma,
        MatKhau: matKhau,
        NgayKham: ngayKham,
        PhuThu: phuThu,
        ChuyenKhoa: chuyenKhoa,
        ListCheckbox: listCheckbox
    }

    if (validate()) {
        let index = data.findIndex((a) => a.Ma == item.Ma);
        if (index >= 0) {
            data.splice(index, 1, item);
            alert("Sửa lịch thành công");
            clearInput();
        } else {
            data.push(item);
            alert("Đặt lịch thành công");
            clearInput();
        }
    } else {
        alert("Đặt lịch thất bại");
    }

    render();
 });


 function chkMa() {
    var ma = $('#txt-mabenhnhan').value;
    var warn = $('#ma-error');
    var regex = /^BN-[0-9]{5}$/;

    if (ma == null || ma == '') {
        warn.innerHTML = "Mã bệnh nhân không được để trống!";
    } else if (!regex.test(ma)) {
        warn.innerHTML = "Mã bệnh nhân có dạng BN-YYYYY(BN cố định và năm số)!";
    } else {
        warn.innerHTML = "";
        return true;
    }
    return false;
 }

 function chkPass() {
    var matkhau = $('#txt-matkhau').value;
    var warn = $('#matkhau-error');
    var regex = /.{6,}/;

    if (matkhau == null || matkhau == '') {
        warn.innerHTML = "Mật khẩu không được để trống!";
    } else if (!regex.test(matkhau)) {
        warn.innerHTML = "Mật khẩu từ 6 kí tự bất kì trở lên!";
    } else {
        warn.innerHTML = "";
        return true;
    }
    return false;
 }

 function chkDichVu() {
    var warn = $('#service-error');
    if (!(chkList[0].checked || chkList[1].checked || chkList[2].checked)) {
        warn.innerHTML = "Phải chọn một dịch vụ!"
    } else {
        warn.innerHTML = "";
        return true;
    }
    return false;
 }

 function chkNgayKham() {
    var date = $('#txt-date').value;
    var warn = $('#date-error');
    if (Date.parse(date) > new Date()) {
        warn.innerHTML = "Ngày khám phải sau ngày hiện tại";
    } else {
        warn.innerHTML = "";
        return true;
    }
    return false;
 }

 function validate() {
    if (chkPass() && chkDichVu() && chkNgayKham() && chkMa()) {
        return true;
    } 
    return false;
 }
