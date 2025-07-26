const itemGrid = document.getElementById("item-grid");
const orderItemsTable = document.getElementById("order-items");
const totalPriceSpan = document.getElementById("total-price");
const totalPriceHeader = document.getElementById("total-price-header");
const cancelItemButton = document.getElementById("cancel-item");
const deleteAllButton = document.getElementById("delete-all");
const categoryFilter = document.getElementById("category-filter");
const searchItems = document.getElementById("search-items");
const itemNumberInput = document.getElementById("item-number");
const quantityInput = document.getElementById("quantity");
const addItemButton = document.getElementById("add-item");
const acButton = document.getElementById("ac");
const clearButton = document.getElementById("clear");
const billButton = document.getElementById("bill-button");
const printReceiptButton = document.getElementById("print-receipt");
const orderTable = document.getElementById("order-table");
const summaryTable = document.getElementById("summary-table");
const gstAmount = document.getElementById("gst-amount");
const payableAmount = document.getElementById("payable-amount");
const tenderAmount = document.getElementById("tender-amount");
const changeAmount = document.getElementById("change-amount");
const transactionId = document.getElementById("transaction-id");
const billTimestamp = document.getElementById("bill-timestamp");
const receiptPreview = document.getElementById("receipt-preview");
const newBillButton = document.getElementById("new-bill");
const billHistoryButton = document.getElementById("bill-history-button");
const goodsReturnButton = document.getElementById("goods-return");
const billsViewPanel = document.getElementById("bills-view-panel");
const salesViewPanel = document.getElementById("sales-view-panel");
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const dateFilter = document.getElementById("date-filter");
const fromDateInput = document.getElementById("from-date");
const toDateInput = document.getElementById("to-date");

let orderItems = JSON.parse(localStorage.getItem('currentOrder')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
let selectedCategory = "--Select--";
let tenderValue = 0;
let previousOrderItems = [];
let transactionCounter = parseInt(localStorage.getItem('transactionCounter')) || 1000;
let itemsData = [];

const inventoryData = [
  { name: "Lipstick", price: 16.50, category: "Makeup", image: "https://tse3.mm.bing.net/th?id=OIP.d1HLRIZXyxy0sbUAIeqXkwHaHa&pid=Api&P=0&h=180" },
  { name: "Foundation", price: 22.30, category: "Makeup", image: "https://sp.yimg.com/ib/th?id=OPAC.Wt87LZS3uAoueA474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Mascara", price: 11.20, category: "Makeup", image: "https://sp.yimg.com/ib/th?id=OPAC.GKCPv02DX9dZvA474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Eyeshadow", price: 15.50, category: "Makeup", image: "https://sp.yimg.com/ib/th?id=OPAC.12AUcL252eFecA474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Blush", price: 11.70, category: "Makeup", image: "https://sp.yimg.com/ib/th?id=OPAC.B5zpmTbF%2bGc9Zw474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Face Cleanser", price: 16.10, category: "Cleansers", image: "https://sp.yimg.com/ib/th?id=OPAC.BKRWquhJNEvqUQ474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Moisturizer", price: 27.00, category: "Skincare", image: "https://sp.yimg.com/ib/th?id=OPAC.cDn5iYb6pFyyCA474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Serum", price: 30.00, category: "Skincare", image: "https://sp.yimg.com/ib/th?id=OPAC.P9l0nAz8cLEF1w474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Shampoo", price: 12.50, category: "Haircare", image: "https://sp.yimg.com/ib/th?id=OPAC.TL2o6aUd%2foRP1A474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Conditioner", price: 12.50, category: "Haircare", image: "https://sp.yimg.com/ib/th?id=OPAC.8E0s6V6BILomnQ474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Hair Mask", price: 17.00, category: "Haircare", image: "https://sp.yimg.com/ib/th?id=OPAC.PITtlaFsQRF9OQ474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Perfume", price: 45.00, category: "Fragrance", image: "https://sp.yimg.com/ib/th?id=OPAC.NVxTcJfsTneDWA474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Nail Polish", price: 8.50, category: "Nailcare", image: "https://sp.yimg.com/ib/th?id=OPAC.PdQHlzPLbLEtwg474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Nail Remover", price: 5.00, category: "Nailcare", image: "https://sp.yimg.com/ib/th?id=OPAC.VVebt6x2celd0g474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Makeup Brushes", price: 20.00, category: "Tools", image: "https://sp.yimg.com/ib/th?id=OPAC.LBDGLqpK6z2csw474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Hairbrush", price: 10.00, category: "Tools", image: "https://sp.yimg.com/ib/th?id=OPAC.gpr4huCmX2jajA474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Body Lotion", price: 15.00, category: "Bodycare", image: "https://sp.yimg.com/ib/th?id=OPAC.8ZXpAiHMttgK1g474C474&o=5&pid=21.1&w=174&h=174" },
  { name: "Sunscreen", price: 18.00, category: "Skincare", image: "https://sp.yimg.com/ib/th?id=OPAC.qy7E3yDzhhFY3A474C474&o=5&pid=21.1&w=174&h=174" }
];

function getDateRange(filter) {
  const now = new Date('2025-07-26T22:45:00+05:30'); // Updated to current date and time: July 26, 2025, 10:45 PM IST
  let start, end;

  switch (filter) {
    case "Today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      break;
    case "Yesterday":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
      break;
    case "This Week":
      const firstDayOfWeek = now.getDate() - now.getDay();
      start = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      end = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek + 6, 23, 59, 59);
      break;
    case "Last Week":
      const firstDayOfLastWeek = now.getDate() - now.getDay() - 7;
      start = new Date(now.getFullYear(), now.getMonth(), firstDayOfLastWeek);
      end = new Date(now.getFullYear(), now.getMonth(), firstDayOfLastWeek + 6, 23, 59, 59);
      break;
    case "This Month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      break;
    case "Last Month":
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
      break;
    case "Custom":
      start = fromDate ? new Date(fromDate) : null;
      end = toDate ? new Date(toDate) : null;
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);
      break;
    default:
      start = null;
      end = null;
  }
  return { start, end };
}

function loadItems(searchTerm = "") {
  itemGrid.innerHTML = '<p class="error-message">Loading items...</p>';
  itemsData = inventoryData;

  const filteredItems = itemsData.filter(item => {
    const searchTermLower = searchTerm.trim().toLowerCase();
    return (item.name || '').toLowerCase().includes(searchTermLower);
  });

  if (filteredItems.length === 0) {
    itemGrid.innerHTML = `<p class="error-message">No items found for "${searchTerm || 'any term'}".</p>`;
    return;
  }

  itemGrid.innerHTML = '';
  filteredItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <img src="https://via.placeholder.com/150?text=Loading..." data-src="${item.image || 'https://via.placeholder.com/150?text=' + item.name}" alt="${item.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/150?text=Image+Not+Found'">
      <p>${item.name}</p>
      <p>$${item.price.toFixed(2)}</p>`;
    itemDiv.addEventListener("click", () => {
      addToOrder(item);
    });
    itemGrid.appendChild(itemDiv);
  });

  // Lazy load images
  const images = itemGrid.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 50px 0px' });
  images.forEach(img => observer.observe(img));
}

function addToOrder(item, quantity = 1) {
  const parsedQuantity = parseFloat(quantity);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    alert('Please enter a valid quantity greater than 0.');
    return;
  }

  const existingItem = orderItems.find(i => i.name === item.name);
  if (existingItem) {
    existingItem.quantity += parsedQuantity;
  } else {
    orderItems.push({ name: item.name, quantity: parsedQuantity, price: item.price });
  }

  orderHistory.push({ name: item.name, quantity: parsedQuantity });
  localStorage.setItem('currentOrder', JSON.stringify(orderItems));
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  renderOrder();
}

function cancelLastItem() {
  if (orderHistory.length === 0 || orderItems.length === 0) {
    alert('No items in the cart to cancel!');
    return;
  }

  const lastAddition = orderHistory.pop();
  const itemToCancel = orderItems.find(i => i.name === lastAddition.name);
  
  if (itemToCancel) {
    if (itemToCancel.quantity > lastAddition.quantity) {
      itemToCancel.quantity -= lastAddition.quantity;
    } else {
      orderItems = orderItems.filter(i => i.name !== itemToCancel.name);
    }
    localStorage.setItem('currentOrder', JSON.stringify(orderItems));
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    renderOrder();
    alert(`${lastAddition.quantity} ${lastAddition.name} cancelled from the cart.`);
  }
}

function deleteAllItems() {
  orderItems = [];
  orderHistory = [];
  tenderValue = 0;
  previousOrderItems = [];
  receiptPreview.style.display = 'none';
  renderOrder();
  orderTable.style.display = 'table';
  summaryTable.style.display = 'none';
  totalPriceHeader.style.display = 'block';
  totalPriceSpan.textContent = '0.00';
  transactionId.textContent = 'N/A';
  billTimestamp.textContent = 'N/A';
  localStorage.setItem('currentOrder', JSON.stringify(orderItems));
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  localStorage.setItem('transactionCounter', transactionCounter);
}

function renderOrder() {
  orderItemsTable.innerHTML = "";
  let total = 0;

  orderItems.forEach(item => {
    const rowTotal = item.quantity * item.price;
    total += rowTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${rowTotal.toFixed(2)}</td>`;
    orderItemsTable.appendChild(row);
  });

  totalPriceSpan.textContent = total.toFixed(2);
}

function generateBill() {
  if (orderItems.length === 0) {
    alert('No items in the cart to generate a bill!');
    return;
  }

  previousOrderItems = [...orderItems];
  let subtotal = 0;
  orderItems.forEach(item => {
    subtotal += item.quantity * item.price;
  });

  const gstRate = 0.07;
  const gst = subtotal * gstRate;
  const payable = subtotal + gst;
  transactionCounter++;
  const transId = `TXN${transactionCounter}`;
  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  gstAmount.textContent = `$${gst.toFixed(2)}`;
  payableAmount.textContent = `$${payable.toFixed(2)}`;
  tenderAmount.textContent = `$${tenderValue.toFixed(2)}`;
  const change = tenderValue - payable;
  changeAmount.textContent = `$${change >= 0 ? change.toFixed(2) : '0.00'}`;
  transactionId.textContent = transId;
  billTimestamp.textContent = timestamp;

  orderTable.style.display = 'none';
  totalPriceHeader.style.display = 'none';
  summaryTable.style.display = 'table';

  const billData = {
    items: previousOrderItems,
    subtotal: subtotal,
    gst: gst,
    payable: payable,
    tender: tenderValue,
    change: change >= 0 ? change : 0,
    transactionId: transId,
    timestamp: timestamp
  };
  let bills = JSON.parse(localStorage.getItem('bills')) || [];
  bills.push(billData);
  localStorage.setItem('bills', JSON.stringify(bills));

  orderItems = [];
  orderHistory = [];
  localStorage.setItem('currentOrder', JSON.stringify(orderItems));
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  localStorage.setItem('transactionCounter', transactionCounter);
  renderOrder();
}

function generateReceipt() {
  if (previousOrderItems.length === 0) {
    alert('No bill to print!');
    return;
  }
  const timestamp = billTimestamp.textContent;
  let receipt = `<h4>Receipt</h4><p>Date & Time: ${timestamp}</p><hr>`;
  receiptPreview.innerHTML = receipt;
  receiptPreview.style.display = 'block';
}

function addTender(amount) {
  tenderValue += parseFloat(amount);
  if (summaryTable.style.display === 'table') {
    tenderAmount.textContent = `$${tenderValue.toFixed(2)}`;
    const payable = parseFloat(payableAmount.textContent.replace('$', ''));
    const change = tenderValue - payable;
    changeAmount.textContent = `$${change >= 0 ? change.toFixed(2) : '0.00'}`;
  }
}

function startNewBill() {
  deleteAllItems();
}

function showMainView() {
  billsViewPanel.style.display = 'none';
  salesViewPanel.style.display = 'none';
  billsViewPanel.innerHTML = '';
  salesViewPanel.innerHTML = '';
  leftPanel.style.display = 'flex';
  rightPanel.style.display = 'flex';
  dateFilter.style.display = selectedCategory === "Custom" ? 'flex' : 'none';
}

function parseBillDate(timestamp) {
  const parts = timestamp.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(.*)/);
  if (!parts) return new Date(timestamp);
  const dateString = `${parts[2]}/${parts[1]}/${parts[3]} ${parts[4]}`;
  return new Date(dateString);
}

function showBillsView() {
  leftPanel.style.display = 'none';
  rightPanel.style.display = 'none';
  salesViewPanel.style.display = 'none';
  billsViewPanel.style.display = 'flex';

  const storedBills = JSON.parse(localStorage.getItem('bills')) || [];
  let content = `
    <div class="bills-header">
      <h2>Bill History</h2>
      <button class="retry-button" id="back-to-pos-button">Back to POS</button>
    </div>
  `;

  if (storedBills.length === 0) {
    content += `<p class="error-message">No saved bills found.</p>`;
  } else {
    storedBills.sort((a, b) => parseBillDate(b.timestamp) - parseBillDate(a.timestamp));

    let tableRows = '';
    storedBills.forEach(bill => {
      let itemDetailsRows = '';
      bill.items.forEach(item => {
        itemDetailsRows += `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
          </tr>
        `;
      });

      tableRows += `
        <tr class="bill-summary-row" data-transaction-id="${bill.transactionId}">
          <td><span class="expand-icon"></span> ${bill.transactionId}</td>
          <td>${bill.timestamp}</td>
          <td>${bill.items.length}</td>
          <td>$${bill.payable.toFixed(2)}</td>
        </tr>
        <tr class="bill-details-row" id="details-${bill.transactionId}" style="display: none;">
          <td colspan="4">
            <table class="item-details-table">
              <thead>
                <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
              </thead>
              <tbody>${itemDetailsRows}</tbody>
            </table>
          </td>
        </tr>
      `;
    });

    content += `
      <table class="bills-table">
        <thead>
          <tr><th>Transaction ID</th><th>Date & Time</th><th>Items Count</th><th>Total Payable</th></tr>
        </thead>
        <tbody id="bills-table-body">${tableRows}</tbody>
      </table>
    `;
  }

  billsViewPanel.innerHTML = content;
  document.getElementById('back-to-pos-button').addEventListener('click', showMainView);
  
  const billsTableBody = document.getElementById('bills-table-body');
  if (billsTableBody) {
    billsTableBody.addEventListener('click', (e) => {
      const summaryRow = e.target.closest('.bill-summary-row');
      if (!summaryRow) return;

      const transactionId = summaryRow.dataset.transactionId;
      const detailsRow = document.getElementById(`details-${transactionId}`);
      
      if (detailsRow) {
        summaryRow.classList.toggle('expanded');
        const isHidden = detailsRow.style.display === 'none';
        detailsRow.style.display = isHidden ? 'table-row' : 'none';
      }
    });
  }
}

function showSalesView() {
  leftPanel.style.display = 'none';
  rightPanel.style.display = 'none';
  billsViewPanel.style.display = 'none';
  salesViewPanel.style.display = 'flex';

  const storedBills = JSON.parse(localStorage.getItem('bills')) || [];
  let content = `
    <div class="sales-header">
      <h2>Sales Summary</h2>
      <button class="retry-button" id="back-to-pos-from-sales">Back to POS</button>
    </div>
    <div class="sales-filter-container">
      <div class="custom-dropdown" id="sales-category-filter">
        <div class="dropdown-toggle" aria-label="Filter sales by period">
          <span>${selectedCategory}</span>
          <span>▼</span>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-item ${selectedCategory === '--Select--' ? 'selected' : ''}" data-value="--Select--">--Select--</div>
          <div class="dropdown-item ${selectedCategory === 'Today' ? 'selected' : ''}" data-value="Today">Today</div>
          <div class="dropdown-item ${selectedCategory === 'Yesterday' ? 'selected' : ''}" data-value="Yesterday">Yesterday</div>
          <div class="dropdown-item ${selectedCategory === 'This Week' ? 'selected' : ''}" data-value="This Week">This Week</div>
          <div class="dropdown-item ${selectedCategory === 'Last Week' ? 'selected' : ''}" data-value="Last Week">Last Week</div>
          <div class="dropdown-item ${selectedCategory === 'This Month' ? 'selected' : ''}" data-value="This Month">This Month</div>
          <div class="dropdown-item ${selectedCategory === 'Last Month' ? 'selected' : ''}" data-value="Last Month">Last Month</div>
          <div class="dropdown-item ${selectedCategory === 'Custom' ? 'selected' : ''}" data-value="Custom">Custom</div>
        </div>
      </div>
      <div class="date-filter" id="sales-date-filter" style="display: ${selectedCategory === 'Custom' ? 'flex' : 'none'};">
        <input type="date" id="sales-from-date" aria-label="From date" value="${fromDate || ''}">
        <input type="date" id="sales-to-date" aria-label="To date" value="${toDate || ''}">
      </div>
    </div>
  `;

  if (storedBills.length === 0) {
    content += `<p class="error-message">No sales data found.</p>`;
  } else {
    const { start, end } = getDateRange(selectedCategory);
    const salesSummary = {};

    storedBills.forEach(bill => {
      const billDate = parseBillDate(bill.timestamp);
      const billTimestamp = billDate.getTime();

      if (start && end) {
        const startTimestamp = start.getTime();
        const endTimestamp = end.getTime();
        if (billTimestamp < startTimestamp || billTimestamp > endTimestamp) {
          return;
        }
      }

      bill.items.forEach(item => {
        if (salesSummary[item.name]) {
          salesSummary[item.name].quantity += item.quantity;
        } else {
          salesSummary[item.name] = { quantity: item.quantity, price: item.price };
        }
      });
    });

    const salesEntries = Object.entries(salesSummary);
    if (salesEntries.length === 0) {
      content += `<p class="error-message">No sales found for the selected period.</p>`;
    } else {
      let tableRows = '';
      salesEntries.forEach(([name, data]) => {
        const totalPrice = data.quantity * data.price;
        tableRows += `
          <tr class="sales-summary-row">
            <td>${name}</td>
            <td>${data.quantity}</td>
            <td>$${data.price.toFixed(2)}</td>
            <td>$${totalPrice.toFixed(2)}</td>
          </tr>
        `;
      });

      content += `
        <table class="sales-table">
          <thead>
            <tr><th>Item Name</th><th>Total Quantity Sold</th><th>Unit Price</th><th>Total Price</th></tr>
          </thead>
          <tbody id="sales-table-body">${tableRows}</tbody>
        </table>
      `;
    }
  }

  salesViewPanel.innerHTML = content;

  const salesCategoryFilter = document.getElementById('sales-category-filter');
  const salesDropdownToggle = salesCategoryFilter.querySelector('.dropdown-toggle');
  const salesDropdownMenu = salesCategoryFilter.querySelector('.dropdown-menu');
  const salesDropdownItems = salesCategoryFilter.querySelectorAll('.dropdown-item');
  const salesDateFilter = document.getElementById('sales-date-filter');
  const salesFromDateInput = document.getElementById('sales-from-date');
  const salesToDateInput = document.getElementById('sales-to-date');

  salesDropdownToggle.addEventListener('click', () => {
    salesDropdownMenu.style.display = salesDropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  salesDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      salesDropdownItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedCategory = item.getAttribute('data-value');
      salesDropdownToggle.querySelector('span').textContent = item.textContent;

      if (selectedCategory === "Custom") {
        salesDateFilter.style.display = 'flex';
        salesFromDateInput.value = '';
        salesToDateInput.value = '';
        fromDate = null;
        toDate = null;
      } else {
        salesDateFilter.style.display = 'none';
        fromDate = null;
        toDate = null;
      }
      salesDropdownMenu.style.display = 'none';
      showSalesView();
    });
  });

  salesFromDateInput.addEventListener('change', () => {
    fromDate = salesFromDateInput.value;
    if (fromDate && toDate) {
      showSalesView();
    }
  });

  salesToDateInput.addEventListener('change', () => {
    toDate = salesToDateInput.value;
    if (fromDate && toDate) {
      showSalesView();
    }
  });

  document.addEventListener('click', (e) => {
    if (!salesCategoryFilter.contains(e.target)) {
      salesDropdownMenu.style.display = 'none';
    }
  });

  document.getElementById('back-to-pos-from-sales').addEventListener('click', showMainView);
}

billButton.addEventListener('click', generateBill);
newBillButton.addEventListener('click', startNewBill);
printReceiptButton.addEventListener('click', generateReceipt);
goodsReturnButton.addEventListener('click', showSalesView);

document.querySelectorAll('.keypad button[data-value]').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const activeInput = document.activeElement;
    if (activeInput === itemNumberInput || activeInput === quantityInput) {
      activeInput.value += value;
    }
  });
});

document.querySelectorAll('.action-buttons button[data-tender]').forEach(button => {
  button.addEventListener('click', () => {
    addTender(button.getAttribute('data-tender'));
  });
});

addItemButton.addEventListener('click', () => {
  const itemName = itemNumberInput.value.trim();
  const quantity = quantityInput.value.trim();
  if (!itemName || !quantity) {
    alert('Please enter both item name and quantity.');
    return;
  }
  const item = itemsData.find(i => i.name.toLowerCase() === itemName.toLowerCase());
  if (item) {
    addToOrder(item, quantity);
    itemNumberInput.value = '';
    quantityInput.value = '';
  } else {
    alert('Item not found!');
  }
});

acButton.addEventListener('click', () => {
  itemNumberInput.value = '';
  quantityInput.value = '';
});

clearButton.addEventListener('click', () => {
  if (document.activeElement === itemNumberInput) itemNumberInput.value = '';
  else if (document.activeElement === quantityInput) quantityInput.value = '';
});

const dropdownToggle = categoryFilter.querySelector('.dropdown-toggle');
const dropdownMenu = categoryFilter.querySelector('.dropdown-menu');
const dropdownItems = categoryFilter.querySelectorAll('.dropdown-item');

dropdownToggle.addEventListener('click', () => {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    dropdownItems.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    selectedCategory = item.getAttribute('data-value');
    dropdownToggle.querySelector('span').textContent = item.textContent;

    if (selectedCategory === "Custom") {
      dateFilter.style.display = 'flex';
      fromDateInput.value = '';
      toDateInput.value = '';
      fromDate = null;
      toDate = null;
    } else {
      dateFilter.style.display = 'none';
      fromDate = null;
      toDate = null;
    }
    dropdownMenu.style.display = 'none';
  });
});

fromDateInput.addEventListener('change', () => {
  fromDate = fromDateInput.value;
  if (fromDate && toDate) {
    if (salesViewPanel.style.display === 'flex') {
      showSalesView();
    }
  }
});

toDateInput.addEventListener('change', () => {
  toDate = toDateInput.value;
  if (fromDate && toDate) {
    if (salesViewPanel.style.display === 'flex') {
      showSalesView();
    }
  }
});

document.addEventListener('click', (e) => {
  if (!categoryFilter.contains(e.target)) {
    dropdownMenu.style.display = 'none';
  }
});

searchItems.addEventListener("input", () => loadItems(searchItems.value));
cancelItemButton.addEventListener("click", cancelLastItem);
deleteAllButton.addEventListener("click", deleteAllItems);
billHistoryButton.addEventListener('click', showBillsView);

loadItems();