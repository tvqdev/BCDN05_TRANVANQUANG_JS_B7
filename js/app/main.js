// Golbal

var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();



/* Hàm rut gọn document.getElementById*/
function getELE(id) {
     return document.getElementById(id);
}

// ma,taiKhoan,hoten,email,matkhau,ngaysinh,luongcoban,chucvu,giolam
function ThemNhanVien() {

     /* Hàm lấy nhân viên từ form */
     var taiKhoan = getELE("tknv").value;
     var hoten = getELE("name").value;
     var email = getELE("email").value;
     var matkhau = getELE("password").value;
     var ngaylam = getELE("datepicker").value;
     var luongcoban = getELE("luongCB").value;
     var chucvu = getELE("chucvu").value;
     var giolam = getELE("gioLam").value;

     //console.log(taiKhoan, hoten, email, matkhau, ngaylam, luongcoban, chucvu, giolam);
     var isValid = true;
     // check tài khoản
     isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Mã nhân viên không được để trống") && validation.checkID(taiKhoan,"tbTKNV","Mã snhân viên không được trùng",dsnv.mangNV);
     
     // check Name
     isValid &= validation.checkEmpty(hoten, "tbTen", "tên nhân viên không được để trống") && validation.checkName(hoten, "tbTen", "Tên nhân viên không được nhập số");
     
     // check Email
     isValid &= validation.checkEmpty(email, "tbEmail", "Email nhân viên không được để trống") && validation.checkEmail(email, "tbEmail", "Email nhân viên chưa đúng định dạng");
     
     // check Pass
     isValid &= validation.checkEmpty(matkhau, "tbMatKhau", "Mật khẩu nhân viên không được để trống") && validation.checkPass(matkhau, "tbMatKhau", "Mật khẩu nhân viên chưa đúng định dạng");
     
      // check Lương
     isValid &= validation.checkEmpty(luongcoban, "tbLuongCB", "Lương nhân viên không được để trống") && validation.checkLuong(luongcoban, "tbLuongCB", "Lương nhân viên không được dưới 1000.000");
       // check cv
     isValid &= validation.checkSelect("chucvu","tbChucVu","Chưa chọn chức vụ");
     // check Giờ
     isValid &= validation.checkGio(giolam,"tbGiolam","Giờ làm nhân viên không được để trống") && validation.checkGio(giolam,"tbGiolam","Giờ làm nhân viên lớn hơn hoặc bằng 0");


     // Tạo thể hiện 
     if (isValid) {
          var nv = new NhanVien(taiKhoan, hoten, email, matkhau, ngaylam, Number(luongcoban), chucvu, Number(giolam));
          // console.log(nv.tongLuong());
          nv.tongLuong();
          nv.xepLoaiNV();
          dsnv.them(nv);

          HienLenTable(dsnv.mangNV);
          setLocalStorage(dsnv.mangNV);

     }
}

function HienLenTable(mang) {
     var content = "";
     mang.map(function (nv, index) {
          var tr =
               `
               <tr>
                    <td>${nv.taiKhoan}</td>
                    <td>${nv.hoTen}</td>
                    <td>${nv.email}</td>
                    <td>${nv.ngayLam}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.tinhLuong}</td>
                    <td>${nv.xepLoai}</td>
                    <td>
                         <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xoá</button>
                    </td>
                    
                    <td>
                         <button class="btn btn-primary" onclick="xemNhanVien('${nv.taiKhoan}')" id="" data-toggle="modal" data-target="#myModal">Xem</button>
                    </td>
               </tr>
               `
          content += tr;
     })
     getELE("tableDanhSach").innerHTML = content;

}


// Lưu dữ liêu trên localStorage
function setLocalStorage(mang) {
     localStorage.setItem("DSNV", JSON.stringify(mang));
}

// lấy dữ liệu từ localStorage
function getLocalStorage(mang) {
     if (localStorage.getItem("DSNV") != null) {
          dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
          HienLenTable(dsnv.mangNV);
     }
}

// Xoá nhân viên
function xoaNhanVien(id) {
     dsnv.xoa(id)
     HienLenTable(dsnv.mangNV);
     setLocalStorage(dsnv.mangNV);
}

function xemNhanVien(id) {
     console.log(id);
     var viTri = dsnv.timViTri(id);

     if (viTri != -1) {
          var nv = dsnv.mangNV[viTri];
          getELE("tknv").value = nv.taiKhoan;
          getELE("tknv").disabled = true;
          getELE("name").value = nv.hoTen;
          getELE("email").value = nv.email;
          getELE("password").value = nv.matKhau;
          getELE("datepicker").value = nv.ngayLam;
          getELE("chucvu").value = nv.chucVu;
          getELE("luongCB").value = nv.luongCoBan;
          getELE("gioLam").value = nv.gioLam;
     } else {
          alert("Không tìm thấy id nhân viên cần xem")
     }
     setLocalStorage(dsnv.mangNV);
     HienLenTable(dsnv.mangNV);
     getELE("btnThemNV").disabled = true;
}


function capNhapNhanVien() {
     var taiKhoan = getELE("tknv").value;
     var hoten = getELE("name").value;
     var email = getELE("email").value;
     var matkhau = getELE("password").value;
     var ngaylam = getELE("datepicker").value;
     var luongcoban = getELE("luongCB").value;
     var chucvu = getELE("chucvu").value;
     var giolam = getELE("gioLam").value;


     var isValid = true;

     // check Name
     isValid &= validation.checkEmpty(hoten, "tbTen", "tên nhân viên không được để trống") && validation.checkName(hoten, "tbTen", "Tên nhân viên không được nhập số");
     
     // check Email
     isValid &= validation.checkEmpty(email, "tbEmail", "Email nhân viên không được để trống") && validation.checkEmail(email, "tbEmail", "Email nhân viên chưa đúng định dạng");
     
     // check Pass
     isValid &= validation.checkEmpty(matkhau, "tbMatKhau", "Mật khẩu nhân viên không được để trống") && validation.checkPass(matkhau, "tbMatKhau", "Mật khẩu nhân viên chưa đúng định dạng");
     
      // check Lương
     isValid &= validation.checkEmpty(luongcoban, "tbLuongCB", "Lương nhân viên không được để trống") && validation.checkLuong(luongcoban, "tbLuongCB", "Lương nhân viên không được dưới 1000.000");
     // check cv
     isValid &= validation.checkSelect("chucvu","tbChucVu","Chưa chọn chức vụ");
     
     // check Giờ
     isValid &= validation.checkGio(giolam,"tbGiolam","Giờ làm nhân viên không được để trống") && validation.checkGio(giolam,"tbGiolam","Giờ làm nhân viên lớn hơn hoặc bằng 0");
     // Tạo thể hiện 
     if (isValid) {
          var nv = new NhanVien(taiKhoan, hoten, email, matkhau, ngaylam, luongcoban, chucvu, giolam);
          nv.tongLuong();
          nv.xepLoaiNV();
          dsnv.capNhap(nv);
          HienLenTable(dsnv.mangNV);
          setLocalStorage(dsnv.mangNV)
     }
     
     //getELE("btnDong").onclick = resetForm;
}

function searchNameNV(){
     //tìm tới ô search lấy keyword
     var keyword = getELE("searchName").value.trim();
     var mangTK = [];
     mangTK = dsnv.searchName(keyword);
 
     HienLenTable(mangTK);
}
getELE("searchName").addEventListener("keyup", searchNameNV);
