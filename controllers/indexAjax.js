// console.log(axios)


//Tạo ra 1 object chứa các thông tin backend cung cấp
// var objectGetSinhVien = {
//     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Đường dẫn backend cung cấp để lấy hoặc thêm dữ liệu
//     method: 'GET' //Giao thức backend cung cấp
// }
//Dùng thư viện axios gửi yêu cầu đến server 
// var promise = axios(objectGetSinhVien);

//Khai báo server
var svService = new SinhVienService();

var layThongTinSinhVien =function () {
    var promise = svService.layDanhSachSinhVien();//Gọi service lấy dữ liệu backend về
    promise.then(function(result){//Hàm xử lý khi kết quả trả về thành công
        //console.log(result.data);
        var content = '';
        //Từ dữ liệu table 
        for (var i = 0; i < result.data.length; i++) {
            //Lấy ra từng sinh viên từ kết quả server trả về
            var sv  = result.data[i];
            // Tạo đối tượng sinhVien chứa dữ liệu đó
            var sinhVien = new SinhVien();
            sinhVien.maSinhVien = sv.maSinhVien;
            sinhVien.tenSinhVien = sv.tenSinhVien;
            sinhVien.email = sv.email;
            sinhVien.loaiSinhVien = sv.loaiSinhVien;
            sinhVien.diemRenLuyen = sv.diemRenLuyen;
            sinhVien.diemToan = sv.diemToan;
            sinhVien.diemLy = sv.diemLy;
            sinhVien.diemHoa = sv.diemHoa;
            content+=`<tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>${sinhVien.tinhDiemTrungBinh()}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">
                Xóa</button></td>
                <td><button class="btn btn-primary" onclick="chinhSua('${sinhVien.maSinhVien}')">
                Chỉnh Sửa</button></td>

            </tr>`
            document.getElementById('tblSinhVien').innerHTML = content;
        }
        
    }).catch(function(err){
        console.log(err.response.data)
    })
    
}
layThongTinSinhVien();

// var layDuLieuThanhCong = function (result) { //Hàm xử lý khi kết quả trả về thành công
//     console.log(result.data);
//     var content = '';
//     //Từ dữ liệu table 
//     for (var i = 0; i < result.data.length; i++) {
//         //Lấy ra từng sinh viên từ kết quả server trả về
//         var sv  = result.data[i];
//         content+=`<tr>
//             <td>${sv.maSinhVien}</td>
//             <td>${sv.tenSinhVien}</td>
//             <td>${sv.email}</td>
//             <td>${sv.loaiSinhVien}</td>
//             <td></td>
//             <td>${sv.diemRenLuyen}</td>
//         </tr>`
//     }
//     document.getElementById('tblSinhVien').innerHTML = content;
// }

// var layDuLieuThatBai = function (err) { //Hàm xử lý khi kết quả trả về thành công
//     console.log(err.response.data);
// }

//Phương thức .then(callback): nhận vào 1 hàm có 1 tham số là kết quả trả về thành công từ phía server (Trã về dữ liệu)
//Phương thức .catch(callback): nhận vào 1 hàm có 1 tham số là kết quả trả về từ phía server thất bại (Trả lỗi)
// promise.then(layDuLieuThanhCong).catch(layDuLieuThatBai);

// POST: Chức năng thêm sinh viên vào server
document.querySelector('#btnThemSinhVien').onclick = function () {
    // Lấy thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('sinhVien', sv);
    axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //link BE cung cấp
        method: 'POST', //phương thức BE cung cấp
        data: sv //Theo định dạng BE yêu cầu
    }).then(function(result){
        console.log("Ket qua",result.data)
        layThongTinSinhVien();
        //cách 1: location.reload =>
    }).catch(function(err) {
        console.log("ket qua",err.response.data)
    })
}

var xoaSinhVien = function(maSinhVien){
    //Gọi API từ backend => trả promise
    var promise = svService.xoaSinhVien(maSinhVien);
    //Dùng promise xử lý thành công hoặc thất bại
    promise.then(function(result){
        console.log(result.data);
        //Load API lấy thông tin sin viên
        layThongTinSinhVien();
    }).catch(function(err){
        console.log(err.response.data)
    });
}

var chinhSua =function(maSinhVien){
    //Gọi api lấy thông tin sinh viên từ server dựa vào mã
    var promise =svService.layThongTinSinhVien(maSinhVien);
    promise.then(function(result){
        //Lấy về thành công => Gán dữ liệu lên các thẻ input
        var sinhVien = result.data;

        document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
        document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
        document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;
        document.getElementById('email').value = sinhVien.email;
        document.getElementById('diemToan').value = sinhVien.diemToan;
        document.getElementById('diemLy').value = sinhVien.diemLy;
        document.getElementById('diemHoa').value = sinhVien.diemHoa;
        document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;

    }).catch(function(error){

    })

}

document.getElementById('btnCapNhatSinhVien').onclick =function(){
    // Lấy thông tin sinh viên từ người dùng sau khi đã chỉnh sửa

    var sinhVienUpdate = new SinhVien();
    sinhVienUpdate.maSinhVien =document.getElementById('maSinhVien').value;
    sinhVienUpdate.tenSinhVien =document.getElementById('tenSinhVien').value;
    sinhVienUpdate.email =document.getElementById('email').value;
    sinhVienUpdate.diemToan =document.getElementById('diemToan').value;
    sinhVienUpdate.diemLy =document.getElementById('diemLy').value;

    sinhVienUpdate.diemHoa =document.getElementById('diemHoa').value;
    sinhVienUpdate.diemRenLuyen =document.getElementById('diemRenLuyen').value;
    sinhVienUpdate.loaiSinhVien =document.getElementById('loaiSinhVien').value;

    //Gọi hàm api cập nhật sinh vien từ BE cung cap
    var promise =svService.capNhatThongTinSinhVien(sinhVienUpdate.maSinhVien,sinhVienUpdate);
    promise.then(function(result){
        console.log(result.data)
        // Xử lý thành công
        layThongTinSinhVien();
    }).catch(function(err){
        console.log(err.response.data);
    })
}