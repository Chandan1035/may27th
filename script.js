fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
  .then((response) => response.json())
  .then((data) => renderTable(data))
  .catch((error) => console.error("Error:", error));

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById("coinTableBody");
  tableBody.innerHTML = "";

  data.forEach((coin) => {
    const { name, id, image, symbol, current_price, total_volume } = coin;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${image}" alt="${name}" width="20" height="20"></td>
      <td>${name} (${symbol.toUpperCase()})</td>
      <td>${current_price}</td>
      <td>${total_volume}</td>
    `;

    tableBody.appendChild(row);
  });
}

function search() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document
    .getElementById("coinTableBody")
    .getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    const name = row.cells[1].textContent.toLowerCase();
    const symbol = row.cells[1].textContent.toLowerCase();

    if (name.includes(input) || symbol.includes(input)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function sortDataBy(key) {
  const tableBody = document.getElementById("coinTableBody");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  rows.sort((a, b) => {
    const valueA = a.cells[key === "marketCap" ? 3 : 2].textContent;
    const valueB = b.cells[key === "marketCap" ? 3 : 2].textContent;

    return parseFloat(valueA) - parseFloat(valueB);
  });

  if (key === "percentageChange") {
    rows.reverse();
  }

  rows.forEach((row) => tableBody.appendChild(row));
}
