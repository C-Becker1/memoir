const btn = document.getElementById("test-button")
btn.addEventListener("click", function(){
    x = 1
    y = 2
    fetch("http://localhost:5500/add.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `x=${x}&y=${y}`,
    })
    .then((response) => response.text())
    .then((res) => (document.getElementById("result").innerHTML = res));
  })