    // =====================================================
    // 1. KONFIGURASI & KONSTANTA
    // =====================================================
    const DATA_SEKOLAH = [
      { s: "1 SLEMAN", p: 267.297, d: 250.47 },
      { s: "2 SLEMAN", p: 246.68, d: 231.88 },
      { s: "3 SLEMAN", p: 245.287, d: 225.26 },
      { s: "4 SLEMAN", p: null, d: 197.35 },
      { s: "5 SLEMAN", p: null, d: 181.11 },
      { s: "1 DEPOK", p: 257.276, d: 252.03 },
      { s: "2 DEPOK", p: 245.008, d: 238.48 },
      { s: "3 DEPOK", p: 246.541, d: 245.12 },
      { s: "4 DEPOK", p: 274.688, d: 265.56 },
      { s: "5 DEPOK", p: 245.91, d: 229.30 },
      { s: "1 MLATI", p: 245.062, d: 228.42 },
      { s: "2 MLATI", p: 247.193, d: 235.82 },
      { s: "3 MLATI", p: 245.507, d: 218.40 },
      { s: "1 KALASAN", p: 263.296, d: 253.56 },
      { s: "2 KALASAN", p: 249.261, d: 211.99 },
      { s: "3 KALASAN", p: 247.599, d: 230.39 },
      { s: "4 KALASAN", p: 245.032, d: 232.26 },
      { s: "1 GODEAN", p: 275.54, d: 260.14 },
      { s: "2 GODEAN", p: 246.279, d: 228.17 },
      { s: "3 GODEAN", p: 257.33, d: 250.27 },
      { s: "1 NGAGLIK", p: 248.138, d: 200.12 },
      { s: "2 NGAGLIK", p: 247.013, d: 242.65 },
      { s: "3 NGAGLIK", p: 251.03, d: 214.23 },
      { s: "4 NGAGLIK", p: 250.53, d: 223.94 },
      { s: "1 PAKEM", p: 245.498, d: 240.53 },
      { s: "2 PAKEM", p: 252.459, d: 178.02 },
      { s: "3 PAKEM", p: null, d: 201.11 },
      { s: "4 PAKEM", p: 277.593, d: 261.85 },
      { s: "1 SEYEGAN", p: 247.008, d: 235.37 },
      { s: "1 MINGGIR", p: 247.658, d: 200.96 },
      { s: "1 MOYUDAN", p: 246.072, d: 228.37 },
      { s: "2 MOYUDAN", p: 249.463, d: 169.79 },
      { s: "1 GAMPING", p: 245.152, d: 213.62 },
      { s: "2 GAMPING", p: null, d: 204.26 },
      { s: "3 GAMPING", p: 248.229, d: 211.58 },
      { s: "4 GAMPING", p: null, d: 185.89 },
      { s: "1 BERBAH", p: 245.15, d: 225.32 },
      { s: "2 BERBAH", p: 257.039, d: 242.82 },
      { s: "3 BERBAH", p: null, d: 205.45 },
      { s: "1 NGEMPLAK", p: 245.35, d: 223.23 },
      { s: "2 NGEMPLAK", p: 253.179, d: 201.14 },
      { s: "1 TURI", p: 245.88, d: 218.23 },
      { s: "2 TURI", p: 258.931, d: 200.56 },
      { s: "3 TURI", p: null, d: 139.64 },
      { s: "1 CANGKRINGAN", p: 246.198, d: 192.32 },
      { s: "2 CANGKRINGAN", p: null, d: 169.66 },
      { s: "1 PRAMBANAN", p: 245.106, d: 223.81 },
      { s: "2 PRAMBANAN", p: null, d: 188.76 },
      { s: "3 PRAMBANAN", p: 247.119, d: 68.82 },
      { s: "4 PRAMBANAN", p: null, d: 144.14 },
      { s: "1 TEMPEL", p: 246.739, d: 215.23 },
      { s: "2 TEMPEL", p: 245.102, d: 205.80 },
      { s: "3 TEMPEL", p: 246.961, d: 197.16 },
      { s: "4 TEMPEL", p: null, d: 161.37 }
    ];

    const RULE = {
      tka: 0.4,
      tkad: 0.4,
      tkatkad: 0.8,
      rapor: 0.2,
      minPrestasi: 245,
      nama_wilayah: 'Kab. Sleman',
      regulasi_NG_Dasar: 'TKA dan TKAD 80%, Rapor 20%'
    };

    const mapel = ["IPAS", "MTK", "BINDO"];
    const semesters = 5;
    const form = document.getElementById("form");

    const OPTIMISME_LABEL = {
      14: "😭 Sangat Tidak Yakin",
      13: "😪 Tidak Yakin",
      12: "😥 Kurang Yakin",
      11: "😐 Lumayan Yakin",
      10: "🙂 Agak Yakin",
      9: "😊 Yakin",
      8: "😆 Sangat Yakin"
    };

    let DEBUG_MODE = false;
    let clickCount = 0;
    let popUnderOpened = false;
    const baseURL = "https://s.shopee.co.id/";
    const tokens = ["AA4ETmAQ4H", "BHdCfr7IV", "7KknkDC8va", "5L7I0EGxuc"];

    // =====================================================
    // 2. FUNGSI UTILITAS
    // =====================================================
    function get(id) {
      return parseFloat(document.getElementById(id).value) || 0;
    }

    function avg(arr) {
      return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    function probability(margin, sigma) {
      return 1 / (1 + Math.exp(-margin / sigma));
    }

    function label(prob) {
      if (prob > 0.90) return "💚 Sangat Aman";
      if (prob > 0.80) return "🔵 Aman";
      if (prob > 0.70) return "🟡 Agak Aman";
      if (prob > 0.60) return "🟠 Rawan";
      if (prob > 0.50) return "🔴 Sulit";
      return "🔥 Sangat Sulit";
    }

    function getRandomURL() {
      const i = Math.floor(Math.random() * tokens.length);
      return baseURL + tokens[i];
    }

    // =====================================================
    // 3. FUNGSI LOGIKA INTI
    // =====================================================
    function transform2026(data) {
      const sorted = [...data].sort((a, b) => (b.d || 0) - (a.d || 0));
      const total = sorted.length;
      return sorted.map((s, i) => {
        const rankRatio = i / (total - 1);
        const factor = 1.014 - (0.14 * Math.pow(rankRatio, 1.5));
        const competitionBoost = 1 + (0.03 * (1 - rankRatio));
        const convert = val =>
          val === null ? null : (val * factor * competitionBoost) - (20 + 10 * rankRatio);
        return { ...s, d: convert(s.d), p: convert(s.p), rankRatio };
      });
    }

    function evaluateSekolah(data, nilaiDasar, totalPrestasi, PERFECT_MARGIN) {
      return data.map(s => {
        const sigma = 10 + (15 * s.rankRatio);
        const marginD = s.d !== null ? nilaiDasar - s.d : null;
        const marginP = s.p !== null ? totalPrestasi - s.p : null;
        let probD = 0;
        let probP = 0;

        if (marginD !== null) {
          probD = marginD >= PERFECT_MARGIN
            ? 1
            : probability(Math.min(marginD, 25), sigma);
        }

        if (s.p !== null && totalPrestasi >= RULE.minPrestasi) {
          probP = marginP >= PERFECT_MARGIN
            ? 1
            : probability(Math.min(marginP, 25), sigma);
        }

        return {
          nama: s.s,
          d: s.d,
          p: s.p,
          probD,
          probP,
          labelD: label(probD),
          labelP: label(probP),
          marginD,
          marginP,
          rankRatio: s.rankRatio,
          sigma
        };
      });
    }

    // =====================================================
    // 4. FUNGSI UI GENERATION
    // =====================================================
    function createSliderInput(id) {
      return `
        <div class="input-group">
          <input type="range" min="1" max="100" step="0.01" id="${id}-range">
          <input type="number" min="1" max="100" step="0.01" id="${id}" value="100.00">
        </div>`;
    }

    function generateForm() {
      mapel.forEach(m => {
        form.innerHTML += `<h3>${m} :</h3>`;
        for (let i = 0; i < semesters; i++) {
          form.innerHTML += `<label>Semester ${i + 1} :</label>${createSliderInput(`${m}-s${i}`)}`;
        }
      });
      form.innerHTML += `
        <br><br><h3>TKA :</h3>
        <label>MTK :</label>${createSliderInput("tka-mtk")}
        <label>B.INDO :</label>${createSliderInput("tka-bindo")}
        <br><h3>TKAD :</h3>
        <label>IPAS :</label>${createSliderInput("tkad-ipas")}`;
    }

    // =====================================================
    // 5. FUNGSI PERHITUNGAN UTAMA
    // =====================================================
    function hitung() {
      const raporIPA = avg([...Array(5)].map((_, i) => get(`IPAS-s${i}`)));
      const raporMTK = avg([...Array(5)].map((_, i) => get(`MTK-s${i}`)));
      const raporBIndo = avg([...Array(5)].map((_, i) => get(`BINDO-s${i}`)));
      const totalRapor = raporIPA + raporMTK + raporBIndo;

      const tka_mtk = get("tka-mtk");
      const tka_bindo = get("tka-bindo");
      const totalTKA = tka_mtk + tka_bindo;
      const totalTKAD = get("tkad-ipas");
      const totalUjian = totalTKA + totalTKAD;

      const nilaiDasar = (RULE.tkatkad * totalUjian) + (RULE.rapor * totalRapor);
      const prestasi = get("prestasi");
      const prestasiCap = Math.min(prestasi, 15.00);
      const totalPrestasi = nilaiDasar + prestasiCap;

      const DATA_2026 = transform2026(DATA_SEKOLAH);
      const PERFECT_MARGIN = get("optimisme");
      const hasilEvaluasi = evaluateSekolah(DATA_2026, nilaiDasar, totalPrestasi, PERFECT_MARGIN);

      const rankingDomisili = hasilEvaluasi
        .filter(s => s.marginD !== null)
        .sort((a, b) => b.probD - a.probD);

      const rankingPrestasi = hasilEvaluasi
        .filter(s => s.marginP !== null)
        .sort((a, b) => (b.probP - a.probP) || (b.d - a.d));

      const nama_wilayah = RULE.nama_wilayah;
      const regulasi_NG_Dasar = RULE.regulasi_NG_Dasar;

      // Build output HTML
      let html = "";
      html += `<h2>Penghitungan Nilai Gabungan untuk ${nama_wilayah}:</h2><br>`;
      html += `<h3>Peraturan: ${regulasi_NG_Dasar}</h3><br><br>`;
      html += `Data anda : Jumlah Nilai Rapor 3 MaPel , 5 Semester.<br>`;
      html += `📊 IPA: ${raporIPA.toFixed(2)}<br>`;
      html += `📊 MTK: ${raporMTK.toFixed(2)}<br>`;
      html += `📊 B. Indo: ${raporBIndo.toFixed(2)}<br>`;
      html += `-----------------------------------<br>`;
      html += `➕ Total Nilai Rapor: ${totalRapor.toFixed(2)}<br><br>`;
      html += `Data anda : Nilai TKA & TKAD<br>`;
      html += `📊 TKA MTK: ${tka_mtk.toFixed(2)}<br>`;
      html += `📊 TKA B.Indo: ${tka_bindo.toFixed(2)}<br>`;
      html += `-----------------------------------<br>`;
      html += `➕ Jumlah nilai TKA saja: ${totalTKA.toFixed(2)}<br><br>`;
      html += `Data anda : Nilai TKAD<br>`;
      html += `📊 TKAD IPAS: ${totalTKAD.toFixed(2)}<br>`;
      html += `-----------------------------------<br>`;
      html += `➕ Total Nilai TKA dan TKAD : ${totalUjian.toFixed(2)}<br><br><br>`;
      html += `🧮 <b><i>NG di Jalur Domisili</i> = ${nilaiDasar.toFixed(2)}</b><br><br>`;
      html += `Data anda : Tambahan Nilai Prestasi<br>`;
      html += `📊 Nilai Prestasi: ${prestasiCap.toFixed(2)}<br><br>`;
      html += `🧮 <b>NG di Jalur Prestasi = ${totalPrestasi.toFixed(2)}</b><br><br>`;
      html += totalPrestasi >= RULE.minPrestasi
        ? `✅ Bisa ikut jalur prestasi<br><br>`
        : `❌ Tidak bisa ikut jalur prestasi<br><br>`;

      html += `<br><br><h3>🎯 Prediksi Peluang (Model Regulasi 2026)</h3><br>`;

      if (DEBUG_MODE) {
        html += `⚙️ Tingkat Optimisme: ${PERFECT_MARGIN.toFixed(1)}<br>`;
      }

      html += `<h4>🏠 Peluang Lolos di Jalur Domisili</h4><br>`;
      rankingDomisili.forEach(s => {
        if (DEBUG_MODE) {
          html += `
            <h5>
              ${s.nama}<br>
              ‣ probD: ${(s.probD * 100).toFixed(2)}%<br>
              ‣ marginD: ${s.marginD?.toFixed(2)}<br>
              ‣ sigma: ${s.sigma?.toFixed(2)}<br>
              ‣ rankRatio: ${s.rankRatio.toFixed(3)}<br>
              ‣ label: ${s.labelD}
            </h5><br>`;
        } else {
          html += `<h5>${s.nama} → ${s.labelD}</h5>`;
        }
      });

      html += `<br><br><h4>🏆 Peluang Lolos di jalur Prestasi</h4><br>`;
      rankingPrestasi.forEach(s => {
        if (DEBUG_MODE) {
          html += `
            <h5>
              ${s.nama}<br>
              ‣ probP: ${(s.probP * 100).toFixed(2)}%<br>
              ‣ marginP: ${s.marginP?.toFixed(2)}<br>
              ‣ sigma: ${s.sigma?.toFixed(2)}<br>
              ‣ rankRatio: ${s.rankRatio.toFixed(3)}<br>
              ‣ label: ${s.labelP}
            </h5>`;
        } else {
          html += `<h5>${s.nama} → ${s.labelP}</h5>`;
        }
      });

      document.getElementById("output").innerHTML = html;
      saveInputs();

      // Smooth scroll & highlight effect
      const out = document.getElementById("output");
      out.scrollIntoView({ behavior: "smooth", block: "start" });
      out.classList.remove("highlight");
      void out.offsetWidth;
      out.classList.add("highlight");
      out.setAttribute("tabindex", "-1");
      out.focus();
    }

    // =====================================================
    // 6. FUNGSI VALIDASI & INTERAKSI FORM
    // =====================================================
    function validateForm(mark = false) {
      const inputs = document.querySelectorAll("input[type='number']");
      let firstInvalid = null;
      let isValid = true;

      inputs.forEach(el => {
        if (el.id === "prestasi" || el.id === "optimisme") return;
        const val = parseFloat(el.value) || 0;
        if (val <= 0) {
          isValid = false;
          if (mark) el.style.borderColor = "red";
          if (!firstInvalid) firstInvalid = el;
        } else {
          if (mark) el.style.borderColor = "#ccc";
        }
      });
      return { isValid, firstInvalid };
    }

    function updateButtonState() {
      const btn = document.getElementById("btn-hitung");
      const { isValid } = validateForm(false);
      if (isValid) {
        btn.disabled = false;
        btn.style.background = "#007bff";
        btn.style.cursor = "pointer";
      } else {
        btn.disabled = true;
        btn.style.background = "#aaa";
        btn.style.cursor = "not-allowed";
      }
    }

    function handleSubmit() {
      const { isValid, firstInvalid } = validateForm(true);
      if (!isValid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus();
        return;
      }
      handleUserClick();
      hitung();
    }

    function updateSliderColor(el) {
      if (el.type !== "range") return;
      const min = parseFloat(el.min) || 0;
      const max = parseFloat(el.max) || 100;
      const val = parseFloat(el.value);
      let ratio = (val - min) / (max - min);
      if (el.id === "optimisme-range") ratio = 1 - ratio;
      const hue = ratio * 120;
      const color = `hsl(${hue}, 80%, 45%)`;
      el.style.background = `linear-gradient(to right, ${color} ${ratio * 100}%, #ddd ${ratio * 100}%)`;
    }

    function updateOptimismeLabel() {
      let val = parseInt(document.getElementById("optimisme-range").value);
      if (isNaN(val)) val = 10;
      if (val < 8) val = 8;
      if (val > 14) val = 14;
      const lbl = document.getElementById("optimisme-label");
      if (lbl) lbl.textContent = OPTIMISME_LABEL[val] || "😐 Lumayan Yakin";
    }

    // =====================================================
    // 7. FUNGSI STORAGE (LOCALSTORAGE)
    // =====================================================
    function saveInputs() {
      document.querySelectorAll("input").forEach(i => {
        localStorage.setItem(i.id, i.value);
      });
    }

    function loadInputs() {
      document.querySelectorAll("input").forEach(i => {
        let v = localStorage.getItem(i.id);
        if (v !== null) {
          i.value = v;
        } else {
          if (i.type === "number" && i.id !== "prestasi") {
            i.value = "73";
          }
        }
      });
    }

    function resetForm() {
      document.querySelectorAll("input").forEach(i => {
        i.value = "";
        localStorage.removeItem(i.id);
      });
      document.getElementById("output").innerHTML = "";
    }

    // =====================================================
    // 8. FUNGSI POPUNDER & EVENT HANDLER
    // =====================================================
    function openPopUnder() {
      if (!popUnderOpened) {
        popUnderOpened = true;
        const w = window.open(getRandomURL(), "_blank", "noopener");
        if (w) {
          setTimeout(() => {
            w.blur();
            window.focus();
          }, 100);
        }
      }
    }

    function handleUserClick() {
      clickCount++;
      if (clickCount === 1) {
        // openPopUnder(); // Uncomment jika ingin aktif
      }
    }

    function toggleMenu() {
      const nav = document.getElementById("nav-links");
      nav.classList.toggle("show");
    }

    // Global Input Event Listener
    document.addEventListener("input", (e) => {
      const el = e.target;

      // Optimisme sync
      if (el.id === "optimisme-range" || el.id === "optimisme") {
        const val = Math.round(parseFloat(el.value));
        document.getElementById("optimisme").value = val;
        document.getElementById("optimisme-range").value = val;
        updateOptimismeLabel();
      }

      // Range → Number sync
      if (el.type === "range") {
        if (el.id === "optimisme-range") {
          el.nextElementSibling.value = Math.round(el.value);
        } else {
          el.nextElementSibling.value = Number(el.value).toFixed(2);
        }
        updateSliderColor(el);
      }

      // Number validation & styling
      if (el.type === "number") {
        if (el.value === "") return;
        let val = parseFloat(el.value);
        const isPrestasi = el.id === "prestasi";
        const min = 0;
        const max = isPrestasi ? 15 : 100;
        if (val > max) val = max;
        if (val < min) val = min;
        el.value = Number(val).toFixed(2);
        if (el.previousElementSibling?.type === "range") {
          el.previousElementSibling.value = el.value;
        }
        el.style.borderColor =
          val > (isPrestasi ? 10 : 90) ? "green" :
          val < (isPrestasi ? 3 : 60) ? "red" : "#ccc";
      }

      updateButtonState();
    });

    // Debug toggle
    const debugEl = document.getElementById("debug-toggle");
    if (debugEl) {
      debugEl.addEventListener("change", e => {
        DEBUG_MODE = e.target.checked;
      });
    }

    // =====================================================
    // 9. INISIALISASI (RUN ON LOAD)
    // =====================================================
    (function init() {
      generateForm();
      loadInputs();

      // Initialize optimisme
      const raw = parseFloat(get("optimisme"));
      let initOpt = Math.round(raw);
      if (isNaN(initOpt)) initOpt = 14;
      if (initOpt < 8) initOpt = 8;
      if (initOpt > 14) initOpt = 12;
      document.getElementById("optimisme").value = initOpt;
      document.getElementById("optimisme-range").value = initOpt;
      updateOptimismeLabel();

      // Initialize slider colors & button state
      document.querySelectorAll('input[type="range"]').forEach(el => {
        updateSliderColor(el);
        updateButtonState();
      });
    })();
