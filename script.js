const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Paul, a prisoner of Jesus Christ, and Timothy our brother, unto Philemon our dearly beloved, and fellowlabourer,',
  'And to our beloved Apphia, and Archippus our fellowsoldier, and to the church in thy house:',
  'Grace to you, and peace, from God our Father and the Lord Jesus Christ.',
  'I thank my God, making mention of thee always in my prayers,',
  'Hearing of thy love and faith, which thou hast toward the Lord Jesus, and toward all saints;',
  'That the communication of thy faith may become effectual by the acknowledging of every good thing which is in you in Christ Jesus.',
  'For we have great joy and consolation in thy love, because the bowels of the saints are refreshed by thee, brother.',
  'Wherefore, though I might be much bold in Christ to enjoin thee that which is convenient,',
  'Yet for loves sake I rather beseech thee, being such an one as Paul the aged, and now also a prisoner of Jesus Christ.',
  'I beseech thee for my son Onesimus, whom I have begotten in my bonds:',
  'Which in time past was to thee unprofitable, but now profitable to thee and to me:',
  'Whom I have sent again: thou therefore receive him, that is, mine own bowels:',
  'Whom I would have retained with me, that in thy stead he might have ministered unto me in the bonds of the gospel:',
  'But without thy mind would I do nothing; that thy benefit should not be as it were of necessity, but willingly.',
  'For perhaps he therefore departed for a season, that thou shouldest receive him for ever;',
  'Not now as a servant, but above a servant, a brother beloved, specially to me, but how much more unto thee, both in the flesh, and in the Lord?',
  'If thou count me therefore a partner, receive him as myself.',
  'If he hath wronged thee, or oweth thee ought, put that on mine account;',
  'I Paul have written it with mine own hand, I will repay it: albeit I do not say to thee how thou owest unto me even thine own self besides.',
  'Yea, brother, let me have joy of thee in the Lord: refresh my bowels in the Lord.',
  'Having confidence in thy obedience I wrote unto thee, knowing that thou wilt also do more than I say.',
  'But withal prepare me also a lodging: for I trust that through your prayers I shall be given unto you.',
  'There salute thee Epaphras, my fellowprisoner in Christ Jesus;',
  'Marcus, Aristarchus, Demas, Lucas, my fellowlabourers.',
  'The grace of our Lord Jesus Christ be with your spirit. Amen.'
  
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);