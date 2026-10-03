document.addEventListener('DOMContentLoaded', () => {
    const screenMainSearch = document.getElementById('screen-main-search');
    const screen0 = document.getElementById('screen-0');
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const screen3 = document.getElementById('screen-3');

    const selectGoa = document.getElementById('select-goa');
    const selectGoaBeach = document.getElementById('select-goa-beach');
    const selectGoaCafe = document.getElementById('select-goa-cafe');
    const step2 = document.getElementById('step-2');
    
    const startRecallBtn = document.getElementById('start-recall-btn');
    const backToStandard = document.getElementById('back-to-standard');
    
    const backTo0 = document.getElementById('back-to-0');

    const askAiBtn = document.getElementById('ask-ai-btn');
    const backTo1 = document.getElementById('back-to-1');
    const submitSearch = document.getElementById('submit-search');
    const searchInput = document.getElementById('ai-search-input');
    const loadingState = document.getElementById('loading-state');
    
    const backTo2 = document.getElementById('back-to-2');
    const refineBtn = document.getElementById('refine-btn');
    const refinementArea = document.getElementById('refinement-area');
    const chips = document.querySelectorAll('.chip');

    // Navigation
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // Explicitly kill clicks on bottom nav to prevent any weird bubbling
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    startRecallBtn.addEventListener('click', () => {
        showScreen(screen0);
    });

    backToStandard.addEventListener('click', () => {
        showScreen(screenMainSearch);
    });

    function handleCueSelection(btn) {
        document.querySelectorAll('.cue-card').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        step2.classList.remove('hidden');
        
        setTimeout(() => {
            document.querySelector('.guided-recall-content').scrollTo({
                top: 250,
                behavior: 'smooth'
            });
        }, 50);
    }

    if (selectGoa) selectGoa.addEventListener('click', () => handleCueSelection(selectGoa));
    if (selectGoaBeach) selectGoaBeach.addEventListener('click', () => showScreen(screen1));
    if (selectGoaCafe) selectGoaCafe.addEventListener('click', () => showScreen(screen1));

    backTo0.addEventListener('click', () => {
        showScreen(screen0);
    });

    askAiBtn.addEventListener('click', () => {
        showScreen(screen2);
    });

    backTo1.addEventListener('click', () => {
        showScreen(screen1);
    });

    // Handle chips click
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (chip.closest('#screen-2')) {
                searchInput.value = chip.textContent;
            } else {
                chip.classList.toggle('active');
            }
        });
    });

    // Handle search submission
    function performSearch() {
        if (!searchInput.value.trim()) return;
        
        loadingState.classList.remove('hidden');
        
        setTimeout(() => {
            loadingState.classList.add('hidden');
            showScreen(screen3);
            searchInput.value = ''; // Reset for next time
        }, 1500); // 1.5s artificial delay for effect
    }

    submitSearch.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Screen 3 interactions
    backTo2.addEventListener('click', () => {
        showScreen(screen2);
    });

    refineBtn.addEventListener('click', () => {
        refinementArea.classList.remove('hidden');
        refineBtn.style.display = 'none'; // hide refine button after clicking
        
        // Scroll to bottom
        setTimeout(() => {
            const resultContent = screen3.querySelector('.result-content');
            resultContent.scrollTo({
                top: resultContent.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    });
});
