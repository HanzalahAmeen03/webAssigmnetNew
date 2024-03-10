document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("playerForm");
    const playerDetails = document.getElementById("playerDetails");
    const table = document.createElement("table");
  
    // Load saved player data from local storage
    const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    savedPlayers.forEach(playerData => addRow(playerData));
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      const playerData = {};
      formData.forEach(function (value, key) {
        playerData[key] = value;
      });
  
      addRow(playerData);
  
      // Save player data to local storage
      const updatedPlayers = [...savedPlayers, playerData];
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
  
      form.reset();
    });
  
    function addRow(data) {
      const row = table.insertRow();
      Object.values(data).forEach((value) => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        table.deleteRow(row.rowIndex);
        
        // Remove player data from local storage
        const index = savedPlayers.findIndex(player => JSON.stringify(player) === JSON.stringify(data));
        if (index !== -1) {
          savedPlayers.splice(index, 1);
          localStorage.setItem("players", JSON.stringify(savedPlayers));
        }
      });
  
      const cell = row.insertCell();
      cell.appendChild(deleteButton);
  
      playerDetails.appendChild(table);
    }
  });
  