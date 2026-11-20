const phoneLayout = matchMedia('(max-width: 640px)');
const mobileSheet = document.querySelector('#mobile-nav-sheet');
const mobileSheetTitle = document.querySelector('#mobile-sheet-title');
const mobilePanelButtons = [...document.querySelectorAll('[data-mobile-panel]')];
const mobileGroups = [...mobileSheet.querySelectorAll('[data-mobile-group]')];

function closeMobileSheet() {
  if (mobileSheet.open) mobileSheet.close();
}

for (const button of mobilePanelButtons) {
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    if (!phoneLayout.matches) return;
    const panel = button.dataset.mobilePanel;
    for (const group of mobileGroups) group.hidden = group.dataset.mobileGroup !== panel;
    mobileSheetTitle.textContent = panel === 'products' ? 'Our Products' : 'Explore Contrive_System';
    mobileSheet.showModal();
    button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-sheet-open');
  });
}

mobileSheet.querySelector('[data-close-mobile-sheet]').addEventListener('click', closeMobileSheet);
mobileSheet.addEventListener('click', (event) => {
  if (event.target === mobileSheet || event.target.closest('a')) closeMobileSheet();
});
mobileSheet.addEventListener('close', () => {
  document.body.classList.remove('mobile-sheet-open');
  mobilePanelButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
});
phoneLayout.addEventListener('change', () => {
  if (!phoneLayout.matches) closeMobileSheet();
});
