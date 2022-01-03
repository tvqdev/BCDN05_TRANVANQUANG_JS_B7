/* Khai báo lớp */

function NhanVien(taikhoan,hoten,email,matkhau,ngaylam,luongcoban,chucvu,giolam) {
     // this.maNV = ma;
     this.taiKhoan = taikhoan;
     this.hoTen = hoten;
     this.email = email;
     this.matKhau = matkhau;
     this.ngayLam = ngaylam;
     this.luongCoBan = luongcoban;
     this.chucVu = chucvu;
     this.gioLam = giolam;
     this.tinhLuong = 0;
     this.xepLoai = "";

     // Phương thức tính lương
     this.tongLuong = function () {
          if (this.chucVu == "Sếp") {
               this.tinhLuong = this.luongCoBan * 3;
          } else if (this.chucVu == "Trưởng phòng"){
               this.tinhLuong = this.luongCoBan * 2;
          } else if (this.chucVu == "Nhân viên") {
               this.tinhLuong = this.luongCoBan * 1;               
          } else {
               alert("Chưa tính lương");
          }
     }

     // Phương thức xếp loại
     this.xepLoaiNV = function () {
          if (this.gioLam >= 192) {
               this.xepLoai = "Xuất sắc";
          } else if (this.gioLam >= 176){
               this.xepLoai = "Giỏi";             
          } else if (this.gioLam >= 160){
               this.xepLoai = "Khá";             
          } else {
               this.xepLoai = "Trung bình";             
          }
     }

}