var SinhVien = function (masv,tensv,email,diemtoan,diemly,diemhoa,diemrenluyen,loaisinhvien) { //Lớp đối tượng sinh viên
    this.maSinhVien = masv; //Các thuộc tính của class SinhVien
    this.tenSinhVien = tensv;
    this.email = email;
    this.diemToan = diemtoan;
    this.diemLy = diemly;
    this.diemHoa = diemhoa;
    this.diemRenLuyen = diemrenluyen;
    this.loaiSinhVien = loaisinhvien;
    this.tinhDiemTrungBinh = function () {
        var dtb = (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) /3;
        return dtb;
    }
}