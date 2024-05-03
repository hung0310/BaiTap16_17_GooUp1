var tableList = document.getElementById('table_list_student');

let studentList = [];
let Student_ID = 0;
let id = -1;

function RenderList() {
    var tablebody = tableList.querySelector('tbody');
    tablebody.innerHTML = '';

    studentList.forEach(student => {
        var row = document.createElement('tr');
        var ID_cell = document.createElement('td');
        var Ten_cell = document.createElement('td');
        var NS_cell = document.createElement('td');
        var GT_cell = document.createElement('td');
        var CN_cell = document.createElement('td');
        var btn_update_cell = document.createElement('td');
        var btn_delete_cell = document.createElement('td');
 
        ID_cell.textContent = student.id;
        Ten_cell.textContent = student.ten;
        NS_cell.textContent = student.ns;
        GT_cell.textContent = student.gt;
        CN_cell.textContent = student.cn;

        var update_btn = document.createElement('button');
        update_btn.textContent = 'Cập nhật';
        update_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-emerald-300', 'hover:bg-emerald-500', 'hover:text-white', 'w-20', 'h-6');
        update_btn.onclick = function() {
            updateInfo(student.id, student.ten, student.ns, student.gt);
        };
        btn_update_cell.appendChild(update_btn);


        var delete_btn = document.createElement('button');
        delete_btn.textContent = 'Xóa';
        delete_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-red-300', 'hover:bg-red-600', 'hover:text-white', 'w-20', 'h-6');
        delete_btn.onclick = function(event) {
            DeleteInfo(student.id, event);
        };
        btn_delete_cell.appendChild(delete_btn);

        row.appendChild(ID_cell);
        row.appendChild(Ten_cell);
        row.appendChild(NS_cell);
        row.appendChild(GT_cell);
        row.appendChild(CN_cell);
        row.appendChild(btn_update_cell);
        row.appendChild(btn_delete_cell);

        tablebody.appendChild(row);
    });
}

RenderList();

function ShowInfo(event) {
    event.preventDefault();

    var ten = document.getElementById('ten').value;
    var chuyennganh = document.getElementById('chuyennganh');
    var rdNam = document.getElementById('rd_nam');
    var rdNu = document.getElementById('rd_nu');
    var ns = document.getElementById('dtpk').value;

    var selectedIndex = chuyennganh.selectedIndex;
    var cn = chuyennganh.options[selectedIndex].textContent;
    var gt;

    if (rdNam.checked) {
        gt = rdNam.nextElementSibling.textContent;
    }
    if (rdNu.checked) {
        gt = rdNu.nextElementSibling.textContent;
    }

    if(ten && ns && gt && cn) {
        ++id;
        var newStudent = {id, ten, ns, gt, cn};

        studentList.push(newStudent);
        RenderList();
    
        document.getElementById('ten').value = '';
        rdNam.checked = false;
        rdNu.checked = false;
        document.getElementById('dtpk').value = '';

        console.log("Tên: " + ten);
        console.log("Giới tính: " + ns);
        console.log("Ngày sinh: " + gt);
        console.log("Chuyên ngành: " + cn);
        console.log(studentList);
    } else {
        alert('Nhập đủ thông tin');
    }
}

function updateInfo(id, ten, ns, gt) {
    var form_update = document.getElementById('form_update');
    form_update.style.display = 'flex';
    var form_info = document.getElementById('form_info');
    form_info.style.display = 'none';
    var form_search = document.getElementById('form_search');
    form_search.style.display = 'none';

    var t = document.getElementById('ten_update');
    var rd_nam = document.getElementById('rd_nam_update');
    var rd_nu = document.getElementById('rd_nu_update');
    var dtpk = document.getElementById('dtpk_update');
    Student_ID = id;
    t.value = ten;
    if(gt == "Nam")
        rd_nam.checked = true;
    if(gt == "Nữ")
        rd_nu.checked = true;

    dtpk.value = ns;
}

function UpdateInFo(event) {
    event.preventDefault();

    var ten = document.getElementById('ten_update').value;
    var chuyennganh = document.getElementById('chuyennganh_update');
    var rdNam = document.getElementById('rd_nam_update');
    var rdNu = document.getElementById('rd_nu_update');
    var ns = document.getElementById('dtpk_update').value;

    var selectedIndex = chuyennganh.selectedIndex;
    var cn = chuyennganh.options[selectedIndex].textContent;
    var gt;

    if (rdNam.checked) {
        gt = rdNam.nextElementSibling.textContent;
    }
    if (rdNu.checked) {
        gt = rdNu.nextElementSibling.textContent;
    }

    var studentInfo = studentList.find(student => student.id === Student_ID);
    if(studentInfo) {
        if(ten && ns && gt && cn) {
            studentInfo.ten = ten;
            studentInfo.gt = gt;
            studentInfo.cn = cn;
            studentInfo.ns = ns;

            RenderList();
        } else {
            alert('Nhập đủ thông tin');
        }
    }

    var form_update = document.getElementById('form_update');
    form_update.style.display = 'none';
    var form_info = document.getElementById('form_info');
    form_info.style.display = 'flex';
    var form_search = document.getElementById('form_search');
    form_search.style.display = 'flex';
}

function DeleteInfo(id, event) {
    event.preventDefault();
    Student_ID = id;
    var studentIndex = studentList.findIndex(student => student.id === Student_ID);
    studentList.splice(studentIndex, 1);
    RenderList();
}

function Show_Search_Name_Student() {
    var form_search_name = document.getElementById('form_search_name');
    form_search_name.style.display = 'flex';

    var tablebody = tableList.querySelector('tbody');
    tablebody.innerHTML = '';

    var form_search = document.getElementById('form_search');
    form_search.style.display = 'none';
}

function Search_Name_Student() {
    var ten = document.getElementById('text_search').value;
    if(ten === 'all') {
        RenderList();
        var form_search = document.getElementById('form_search');
        form_search.style.display = 'flex';
        var form_search_name = document.getElementById('form_search_name');
        form_search_name.style.display = 'none';
        document.getElementById('text_search').value = '';
    }
    else if(ten) {
        var SV = studentList.filter(student => student.ten === ten);
        if(SV.length > 0) {
            var tablebody = tableList.querySelector('tbody');
            tablebody.innerHTML = '';
        
            SV.forEach(student => {
                var row = document.createElement('tr');
                var ID_cell = document.createElement('td');
                var Ten_cell = document.createElement('td');
                var NS_cell = document.createElement('td');
                var GT_cell = document.createElement('td');
                var CN_cell = document.createElement('td');
                var btn_update_cell = document.createElement('td');
                var btn_delete_cell = document.createElement('td');
         
                ID_cell.textContent = student.id;
                Ten_cell.textContent = student.ten;
                NS_cell.textContent = student.ns;
                GT_cell.textContent = student.gt;
                CN_cell.textContent = student.cn;
        
                var update_btn = document.createElement('button');
                update_btn.textContent = 'Cập nhật';
                update_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-emerald-300', 'hover:bg-emerald-500', 'hover:text-white', 'w-20', 'h-6');
                update_btn.onclick = function() {
                    updateInfo(student.id, student.ten, student.ns, student.gt);
                };
                btn_update_cell.appendChild(update_btn);
        
        
                var delete_btn = document.createElement('button');
                delete_btn.textContent = 'Xóa';
                delete_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-red-300', 'hover:bg-red-600', 'hover:text-white', 'w-20', 'h-6');
                delete_btn.onclick = function(event) {
                    DeleteInfo(student.id, event);
                };
                btn_delete_cell.appendChild(delete_btn);
        
                row.appendChild(ID_cell);
                row.appendChild(Ten_cell);
                row.appendChild(NS_cell);
                row.appendChild(GT_cell);
                row.appendChild(CN_cell);
                row.appendChild(btn_update_cell);
                row.appendChild(btn_delete_cell);
        
                tablebody.appendChild(row);
            });
            var form_search = document.getElementById('form_search');
            form_search.style.display = 'flex';
            var form_search_name = document.getElementById('form_search_name');
            form_search_name.style.display = 'none';
            document.getElementById('text_search').value = '';
        } else {
            var tablebody = tableList.querySelector('tbody');
            tablebody.innerHTML = '';
            alert("Không có sinh viên nào được tìm thấy");

            var form_search = document.getElementById('form_search');
            form_search.style.display = 'flex';
            var form_search_name = document.getElementById('form_search_name');
            form_search_name.style.display = 'none';
            document.getElementById('text_search').value = '';
        }
    } else {
        alert("Vui lòng nhập tên cần tìm");
    }
}

function GetCN() {
    var cn = document.getElementById('chuyennganh');
    var chuyennganh = [];
    for(var i = 0; i < cn.options.length ; i++) {
        chuyennganh.push(cn.options[i].textContent);
    }
    return chuyennganh;
}

function GetNS() {
    var year = [];

    studentList.forEach(student => {
        var y = student.ns.split("/")[2];
        if(!year.includes(y)) {
            year.push(y);
        }
    });

    return year;
}

function Filter() {
    var form_search_filter = document.getElementById('form_search_filter');
    form_search_filter.style.display = 'flex';

    var tablebody = tableList.querySelector('tbody');
    tablebody.innerHTML = '';

    var CN = GetCN();
    var select_cn = document.getElementById('select_cn');
    while (select_cn.options.length > 0) {
        select_cn.remove(0);
    }
    CN.forEach(txt_cn => {
        var option_cn = document.createElement('option');
        option_cn.textContent = txt_cn;
        option_cn.value = txt_cn;
        select_cn.add(option_cn);
    });

    var NS = GetNS();
    var select_ns = document.getElementById('select_ns');
    while (select_ns.options.length > 0) {
        select_ns.remove(0);
    }
    NS.forEach(txt_ns => {
        var option_ns = document.createElement('option');
        option_ns.textContent = txt_ns;
        option_ns.value = txt_ns;
        select_ns.add(option_ns);
    });

    var form_search = document.getElementById('form_search');
    form_search.style.display = 'none';
}

function Search_Filter() {
    var gt = document.getElementById('select_gt').value;
    var cn = document.getElementById('select_cn').value;
    var ns = document.getElementById('select_ns').value;

    console.log(gt);
    console.log(cn);
    console.log(ns);
    
    var SV = studentList.filter(student => student.gt === gt && student.cn === cn && student.ns.split('/')[2] === ns);
    if(SV.length > 0) {
        var tablebody = tableList.querySelector('tbody');
        tablebody.innerHTML = '';
    
        SV.forEach(student => {
            var row = document.createElement('tr');
            var ID_cell = document.createElement('td');
            var Ten_cell = document.createElement('td');
            var NS_cell = document.createElement('td');
            var GT_cell = document.createElement('td');
            var CN_cell = document.createElement('td');
            var btn_update_cell = document.createElement('td');
            var btn_delete_cell = document.createElement('td');
     
            ID_cell.textContent = student.id;
            Ten_cell.textContent = student.ten;
            NS_cell.textContent = student.ns;
            GT_cell.textContent = student.gt;
            CN_cell.textContent = student.cn;
    
            var update_btn = document.createElement('button');
            update_btn.textContent = 'Cập nhật';
            update_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-emerald-300', 'hover:bg-emerald-500', 'hover:text-white', 'w-20', 'h-6');
            update_btn.onclick = function() {
                updateInfo(student.id, student.ten, student.ns, student.gt);
            };
            btn_update_cell.appendChild(update_btn);
    
    
            var delete_btn = document.createElement('button');
            delete_btn.textContent = 'Xóa';
            delete_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-red-300', 'hover:bg-red-600', 'hover:text-white', 'w-20', 'h-6');
            delete_btn.onclick = function(event) {
                DeleteInfo(student.id, event);
            };
            btn_delete_cell.appendChild(delete_btn);
    
            row.appendChild(ID_cell);
            row.appendChild(Ten_cell);
            row.appendChild(NS_cell);
            row.appendChild(GT_cell);
            row.appendChild(CN_cell);
            row.appendChild(btn_update_cell);
            row.appendChild(btn_delete_cell);
    
            tablebody.appendChild(row);
        });
        var form_search = document.getElementById('form_search');
        form_search.style.display = 'flex';
        var form_search_filter = document.getElementById('form_search_filter');
        form_search_filter.style.display = 'none';
        document.getElementById('text_search').value = '';
    } else {
        var tablebody = tableList.querySelector('tbody');
        tablebody.innerHTML = '';
        alert("Không có sinh viên nào được tìm thấy");
        var form_search = document.getElementById('form_search');
        form_search.style.display = 'flex';
        var form_search_filter = document.getElementById('form_search_filter');
        form_search_filter.style.display = 'none';
        document.getElementById('text_search').value = '';
    }
}