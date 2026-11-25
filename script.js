
// NOMOR WHATSAPP PENJUAL
// Ganti dengan nomor WhatsApp milik penjual.
const NOMOR_WHATSAPP = "085802957735";

// FUNGSI WHATSAPP
function bukaWhatsApp(pesan) {
    if (NOMOR_WHATSAPP === "08580297735") {
        alert("Silakan ganti nomor WhatsApp di script.js terlebih dahulu!");
        return;
    }

    const url = "https://wa.me/" + NOMOR_WHATSAPP +
        "?text=" + encodeURIComponent(pesan);

    window.open(url, "_blank");
}

// HUBUNGI PENJUAL MOTOR
function beliMotor(namaMotor, hargaMotor) {
    const pesan =
        "Halo GARASI GEAR, saya tertarik membeli motor:%0A" +
        "Nama Motor: " + namaMotor + "%0A" +
        "Harga: " + hargaMotor + "%0A" +
        "Apakah motor masih tersedia?";

    bukaWhatsApp(decodeURIComponent(pesan));
}

// HUBUNGI ADMIN
function hubungiAdmin() {
    const pesan =
        "Halo GARASI GEAR, saya ingin bertanya mengenai motor yang tersedia.";

    bukaWhatsApp(pesan);
}

// FITUR PENCARIAN MOTOR
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const motorCards = document.querySelectorAll(".motor-card");
    const emptyMessage = document.getElementById("emptyMessage");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const keyword = this.value.toLowerCase().trim();
            let jumlahTampil = 0;

            motorCards.forEach(function (card) {

                const nama = (
                    card.dataset.name || card.innerText
                ).toLowerCase();

                const cocok = nama.includes(keyword);

                card.style.display = cocok ? "" : "none";

                if (cocok) jumlahTampil++;
            });

            if (emptyMessage) {
                emptyMessage.hidden = jumlahTampil !== 0;
            }
        });
    }

    // FITUR KOMENTAR
    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    const STORAGE_KEY = "garasiGearComments";

    function tampilkanKomentar() {

        if (!commentList) return;

        let komentar = [];

        try {
            komentar = JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            ) || [];
        } catch (error) {
            komentar = [];
        }

        commentList.innerHTML = "";

        if (komentar.length === 0) {
            commentList.innerHTML =
                '<p class="no-comment">Belum ada komentar. Jadilah yang pertama!</p>';
            return;
        }

        komentar.slice().reverse().forEach(function (item) {

            const card = document.createElement("div");
            card.className = "comment-item";

            const nama = document.createElement("strong");
            nama.textContent = item.nama;

            const rating = document.createElement("div");
            rating.className = "comment-rating";
            rating.textContent = "★".repeat(Number(item.rating));

            const isi = document.createElement("p");
            isi.textContent = item.isi;

            const tanggal = document.createElement("span");
            tanggal.className = "comment-date";
            tanggal.textContent = item.tanggal;

            card.append(nama, rating, isi, tanggal);

            commentList.appendChild(card);
        });
    }

    if (commentForm) {

        commentForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nama = document
                .getElementById("namaKomentar")
                .value.trim();

            const rating = document
                .getElementById("ratingKomentar")
                .value;

            const isi = document
                .getElementById("isiKomentar")
                .value.trim();

            if (!nama || !isi) {
                alert("Nama dan komentar harus diisi!");
                return;
            }

            let komentar = [];

            try {
                komentar = JSON.parse(
                    localStorage.getItem(STORAGE_KEY)
                ) || [];
            } catch (error) {
                komentar = [];
            }

            komentar.push({
                nama: nama,
                rating: rating,
                isi: isi,
                tanggal: new Date().toLocaleString("id-ID")
            });

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(komentar)
            );

            commentForm.reset();

            tampilkanKomentar();

            alert("Komentar berhasil ditambahkan!");
        });
    }

    tampilkanKomentar();
});
