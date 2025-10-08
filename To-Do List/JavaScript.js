// inisialisasi javascript ke html

// bikin variabel
const input_task = document.getElementById("input_task"); // manggil id yg ada di html
const btn_add = document.getElementById("btn_add");
const list_task = document.querySelector(".task_section"); // manggil kelas yg ada di html
// container semua task

// array kosong yg akan diisi list oleh user
let tasks = []; // [x] x = list kosong

// fungsi untuk update progress text & progress bar
function update_progress() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length; //jumlah task yg completed

  // update progress text
  const progress_text = document.getElementById("progress_text");
  if (progress_text) {
    progress_text.textContent = `${done}/${total} Missions Completed`;
  }

  // update isi progress bar
  const progress_fill = document.getElementById("progress_fill");
  if (progress_fill) {
    progress_fill.style.width =
      (total ? Math.round((done / total) * 100) : 0) + "%"; // dibagi 0 supaya mulai dari 0%
  }
}

// fungsi menambah task baru
function tambah_task() {
  // utk mengambil nilai dari input
  // trim = hapus spasi di awal/akhir
  // value = apa yg kita masukin
  const teks = input_task.value.trim();

  // validasi ketika list ga diisi tapi pencet add
  if (teks === "") {
    // text kosong
    alert("JANGAN KOSONG!!"); // pop-up di atas
    return; // buat keluar dari fungsi
  }

  // buat objek task baru
  const task_baru = {
    id: Date.now(), // time stamp
    text: teks,
    completed: false, // status: belom slesai
    editing: false,
  };

  // fungsi utk menambahkan "task_baru" ke daftar list/array text "tasks"
  tasks.push(task_baru);

  render_task(); // render ulang tampilan/refresh

  input_task.value = ""; // kosongin input field

  input_task.focus(); // jadiin focusnya input_task ketika user sudah klik add
}

// fungsi menampilkan semua tugas //
function render_task() {
  list_task.innerHTML = "<h3>Daftar List:</h3>";
  if (tasks.length === 0) {
    // tampilkan pesan kosong "belum ada list" //
    list_task.innerHTML += `
    <div class="task_item">
        <span>Belum ada list</span>
    </div>
    `;
    update_progress();
    return;
  }

  tasks.forEach((task) => {
    const task_element = document.createElement("div");
    task_element.className = "task_item"; // bikin div dengan class "task_item" //

    // menampilkan input plus save saat mode edit
    if (task.editing) {
      // kode tombol save & del

      task_element.innerHTML = `
        <input type = "checkbox" ${
          task.completed ? "checked" : ""
          // ketika klik checkbox, ngecheck progress & progressnya jalan
        } onchange = "toggle_selesai (${task.id})">

        <input type = "text" id = "edit_input-${task.id}" value = "${task.text}"
        class = "task_text">

        <div class = "task_action">

          <!-- SAVE Button -->
        <button class = "action_button" onclick = "save_task (${
          task.id
        })">Save</button>
        
        <!-- DELETE Button -->
        <button class = "action_button" onclick = "hapus_task (${
          task.id
        })">Del</button> 
      </div>
      `;
    } else {
      // kode tombol edit & del

      task_element.innerHTML = `
      <input type="checkbox" ${
        task.completed ? "checked" : ""
        // ketika klik checkbox, ngecheck progress & progressnya jalan
      } onchange = "toggle_selesai (${task.id})">

      <span class="task_text ${task.completed ? "completed" : ""}"> ${
        task.text
      }</span>

      <div class = "task_action">
        <!-- EDIT Button -->
        <button class = "action_button edit_button" onclick = "edit_task (${
          task.id
        })">
        Edit
        </button> 
        
        <!-- DELETE Button -->
        <button class = "action_button" onclick = "hapus_task (${task.id})">
        Del
        </button> 
      </div>
      `;
    }
    list_task.appendChild(task_element); // appendChild: nambah list ke dalam arraynya
    // ${} untuk manggil yang ada di JavaScript di HTML //
  });
  update_progress();
}

// fungsi untuk edit text task
function edit_task(id) {
  const edit = tasks.find((task) => task.id === id);
  if (edit) {
    edit.editing = true;
    render_task();
    document.getElementById(`edit_input-${id}`).focus();
  }
}

function save_task(id) {
  const input_element = document.getElementById(`edit_input-${id}`);
  const new_text = input_element.value.trim();
  if (new_text === "") {
    alert("JANGAN KOSONG!!");
    return;
  }

  const edit = tasks.find((task) => task.id === id);
  if (edit) {
    edit.text = new_text;
    edit.editing = false;
    render_task();
  }
}

function hapus_task(id) {
  // task yg idnya sama dgn id yg mau dihapus dibuang
  tasks = tasks.filter((task) => task.id !== id);
  // filter: metode menyaring array, utk ngeluarkan, yg di dalam (kondisi) kalo false: dikeluarin; true: termasuk
  // !== not equal to
  render_task();
}

function toggle_selesai(id) {
  const t = tasks.find((task) => task.id === id);
  if (t) {
    t.completed = !t.completed; // ! utk ngebalik nilai boolean: true -> false, vice versa
    render_task();
  }
}

btn_add.addEventListener("click", tambah_task);

input_task.addEventListener("keypress", (e) => {
  if (e.key === "Enter") tambah_task();
});

// utk update TANGGAL
function update_date() {
  const eldate = document.getElementById("today");
  const eltime = document.getElementById("time");

  if (!eldate) return;
  // !eldate = bukan eldate
  if (!eltime) return;

  const list_day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const list_month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date(); // new Date() = method utk ambil waktu hari ini

  const day = list_day[now.getDay()];
  const date = now.getDate();
  const month = list_month[now.getMonth()];
  const year = now.getFullYear();

  const hour = String(now.getHours()).padStart(2, "0"); // 2 = selalu 2 digit
  const minute = String(now.getMinutes()).padStart(2, "0"); // "0" = kalo ga ada digit di depannya tambahin "0"
  const second = String(now.getSeconds()).padStart(2, "0");
  const millisecond = String((now.getMilliseconds() / 10).toFixed(0)).padStart(
    2,
    "0"
  );

  eldate.textContent = `
  ${day}, ${date} ${month} ${year}
  `;
  eltime.textContent = `
   ${hour} : ${minute} : ${second} . ${millisecond}
  `;
}

update_date();
setInterval(update_date, 0.1); // 0.1ms

render_task(); // kembali ke awal
