/* 
     + Chứa danh sách các đối tượng NV
     + Chứa các thao tác liên quan về mảng
     + Thêm , Xoá , Sửa các phần tử
     
*/

function DSNV(params) {
     // mảng đối tượng
     this.mangNV = [];

     // Phương thức
     this.them = function (nv) {
          this.mangNV.push(nv);
     }

     /* 
          + Tìm vị trí
          + Gán giá trị mặt định cho biến viTri
          +
          +++
          + Duyệt mảng :
               - So sánh mã nv với id
               - Nếu có NV trùng với id => gián vị của nv cho biến viTro
     */

     this.timViTri = function (id) {
          var viTri = -1;

          this.mangNV.map(function (nv, index) {
               if (nv.taiKhoan == id) {
                    viTri = index;
               }
          });
          return viTri;
     }

     this.xoa = function (id) {
          var viTri = this.timViTri(id);

          if (viTri != 1) {
               this.mangNV.splice(viTri, 1)
          } else {
               alert("Không tìm thấy nhân viên cần xoá");
          }
     }

     this.capNhap = function (nv) {
          var viTri = this.timViTri(nv.taiKhoan);
          if (viTri != -1) {
               this.mangNV[viTri] = nv;
          } else {
               alert("Không tìm thấy SV để cập nhập");

          }
     }

     this.searchName = function (keyword) {
          var mangTK = [];
          // keyword: từ khoá tìm kiếm (người dùng nhập)
          //chuyển keyword về chữ thường
          var keywordLower = keyword.toLowerCase();
          //Duyệt mảng sv
          this.mangNV.map(function (nv) {
               //chuyển tên sv về chữ thường
               var nameLower = nv.hoTen.toLowerCase();
               //Kiểm tra tên sv có chứa từ khoá (keyword) không
               var indexName = nameLower.indexOf(keywordLower);
               if (indexName > -1) {
                    //có chứa từ khoá
                    // trả về đối tượng sv phù hợp yêu cầu tìm kiếm
                    mangTK.push(nv);
               }
          });
          return mangTK;
     }
}