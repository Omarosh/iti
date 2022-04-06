var itemArray = [];
const buildItems = (array) => {
  for (i = 0; i < array.length; i++) {
    itemArray.push(array[i]);
  }
  array.forEach((element) => {
    let li = document.createElement("li");
    li.classList.add("item");
    let h4 = document.createElement("h4");
    h4.innerHTML = element.name;
    let p = document.createElement("p");
    p.innerHTML = element.description;
    let h5 = document.createElement("h5");
    h5.innerHTML = `Price: <span>${element.price}</span>LE`;
    let img = document.createElement("img");
    img.src = element.img;
    let idd = document.createElement("id");
    idd.innerHTML = element.id;
    idd.hidden = true;
    let remove = document.createElement("div");
    let controls = document.createElement("div");
    remove.innerHTML = `<button onclick='removeItem(${element.id})'>removeItem</button>`;
    controls.innerHTML = `<button onclick='increase(${element.id})'>+</button>---<button onclick='decrease(${element.id})'>-</button>`;
    let quantity = document.createElement("span");
    quantity.innerHTML = "0";

    li.appendChild(h4);
    li.appendChild(p);
    li.appendChild(h5);
    li.appendChild(img);
    li.appendChild(idd);
    li.appendChild(remove);
    li.appendChild(controls);
    // li.appendChild(quantity);

    let sort1 = document.getElementById("sortable1");
    sort1.appendChild(li);
    console.log(li);
  });
};
const buildOneItem = (id) => {
  let element = itemArray[parseInt(id) - 1];
  let li = document.createElement("li");
  li.classList.add("item");
  let h4 = document.createElement("h4");
  h4.innerHTML = element.name;
  let p = document.createElement("p");
  p.innerHTML = element.description;
  let h5 = document.createElement("h5");
  h5.innerHTML = `Price: <span>${element.price}</span>LE`;
  let img = document.createElement("img");
  img.src = element.img;
  let idd = document.createElement("id");
  idd.innerHTML = element.id;
  idd.hidden = true;
  let remove = document.createElement("div");
  let controls = document.createElement("div");
  remove.innerHTML = `<button onclick='removeItem(${id})'>removeItem</button>`;
  controls.innerHTML = `<button onclick='increase(${element.id})'>+</button>---<button onclick='decrease(${element.id})'>-</button>`;
  let quantity = document.createElement("span");
  quantity.innerHTML = "0";
  li.appendChild(h4);
  li.appendChild(p);
  li.appendChild(h5);
  li.appendChild(img);
  li.appendChild(idd);
  li.appendChild(remove);
  li.appendChild(controls);
  // li.appendChild(quantity);

  let sort1 = document.getElementById("sortable1");
  sort1.insertBefore(li, sort1.children[id - 1]);
  console.log(li);
};
$.ajax({
  url: "./items.js",

  success: (res) => {
    items = JSON.parse(res);
    buildItems(items);
    // console.log(items);
  },
  error: (err) => {
    errors = err;
  },
});

$(function () {
  $(".droptrue").on("click", "li", function () {
    $(this).toggleClass("selected");
  });

  $("ul.droptrue").sortable({
    connectWith: "ul.droptrue",
    opacity: 0.6,
    revert: true,
    helper: function (e, item) {
      console.log("parent-helper");
      console.log(item);
      if (!item.hasClass("selected")) item.addClass("selected");
      var elements = $(".selected").not(".ui-sortable-placeholder").clone();
      var helper = $("<ul/>");
      item.siblings(".selected").addClass("hidden");
      return helper.append(elements);
    },
    start: function (e, ui) {
      var elements = ui.item
        .siblings(".selected.hidden")
        .not(".ui-sortable-placeholder");
      ui.item.data("items", elements);
    },
    receive: function (e, ui) {
      ui.item.before(ui.item.data("items"));
      if (e.target.getAttribute("id") == "sortable1") {
        remItem(ui.item.children("id").html());
      } else if (e.target.getAttribute("id") == "sortable2") {
        addItem(
          ui.item.children("id").html(),
          ui.item.children("h5").children("span").html()
        );
      }
    },
    stop: function (e, ui) {
      ui.item.siblings(".selected").removeClass("hidden");
      $(".selected").removeClass("selected");
    },
    update: function () {
      // updatePostOrder();
      // updateAdd();
    },
  });

  $("#sortable1, #sortable2, #sortable3").disableSelection();
  $("#sortable1, #sortable2, #sortable3").css(
    "minHeight",
    $("#sortable1, #sortable2").height() + "px"
  );
});
console.log("All items: ", itemArray);
// function updatePostOrder() {
//   var arr = [];
//   $("#sortable2 li").each(function () {
//     arr.push($(this).attr("id"));
//   });
//   $("#postOrder").val(arr.join(","));
//   console.log("From sortable2: ", arr);
// }

// function updateAdd() {
//   var arr = [];
//   $("#sortable3 li").each(function () {
//     arr.push($(this).attr("id"));
//   });
//   $("#add").val(arr.join(","));
//   console.log("From sortable3: ", arr);
// }

$(".sortable")
  .sortable()
  .bind("sortupdate", function (e, ui) {
    //ui.item contains the current dragged element.
    //Triggered when the user stopped sorting and the DOM position has changed.
  });

let array = [
  {
    id: 1,
    price: 10,
  },
  {
    id: 2,
    price: 20,
  },
  {
    id: 3,
    price: 30,
  },
];
let array2 = [];
function addItem(id, price) {
  array2 = [...array2, { id: id, price: price }];
  console.log("Omar ", array2);

  buildOneItem(id);

  updateOrder();
}
function remItem(id) {
  for (let i = 0; i < array2.length; i++) {
    if (id == array2[i].id) {
      //
      array2.splice(i, 1);
    }
  }
  let sort1 = document.getElementById("sortable1");
  console.log("logging", sort1);
  let schilds = sort1.children;
  for (let i = 0; i < schilds.length; i++) {
    if (id == parseInt(schilds[i].children[4].innerHTML)) {
      schilds[i].parentNode.removeChild(schilds[i]);
      break;
    }
  }

  console.log("Omar ", array2);
  updateOrder();
}
function updateOrder() {
  let total = 0;
  array2.forEach((element) => {
    total += parseInt(element.price);
  });
  total = Math.round(total * 114) / 100;
  if (total >= 300) {
    let discount = 0.1 * total;
    total = total - discount;
    $("#discount").text(`Your discount: ${discount}`);
  } else {
    $("#discount").text("");
  }
  console.log("total is: ", total);
  $("#total").text(total);
}

function removeItem(id) {
  console.log("Evenet: ", id);

  for (let i = 0; i < array2.length; i++) {
    if (id == array2[i].id) {
      //
      array2.splice(i, 1);
    }
  }
  let sort2 = document.getElementById("sortable2");
  console.log("logging delete btn", sort2);
  let schilds = sort2.children;
  for (let i = 0; i < schilds.length; i++) {
    if (id == parseInt(schilds[i].children[4].innerHTML)) {
      schilds[i].parentNode.removeChild(schilds[i]);
      break;
    }
  }

  console.log("Omar ", array2);
  updateOrder();
}
