/**
 * Toast Notification System
 * A glassmorphism-styled, animated toast manager.
 */

(function () {
    'use strict';

    // ── Container ──────────────────────────────────────────────────────────
    let container = null;

    function getContainer() {
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    // ── SVG Icons ──────────────────────────────────────────────────────────
    const ICONS = {
        success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#22c55e" stroke-width="2"/>
            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#22c55e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.45s" begin="0.1s" fill="freeze" calcMode="spline" keySplines="0.25 0.46 0.45 0.94"/>
                <animate attributeName="stroke-dasharray" from="0 20" to="20 0" dur="0.45s" begin="0.1s" fill="freeze" calcMode="spline" keySplines="0.25 0.46 0.45 0.94"/>
            </path>
        </svg>`,
        error: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`,
        info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="2"/>
            <path d="M12 8v4M12 16h.01" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`
    };

    const COLORS = {
        success: '#22c55e',
        error:   '#ef4444',
        info:    '#3b82f6'
    };

    // ── Core Show Function ─────────────────────────────────────────────────
    /**
     * @param {string} message  - Body text of the toast
     * @param {object} [opts]
     * @param {'success'|'error'|'info'} [opts.type='success']
     * @param {string}  [opts.title]     - Override default title
     * @param {number}  [opts.duration=4000] - Duration in ms before exit
     */
    window.showToast = function showToast(message, opts = {}) {
        const {
            type = 'success',
            title = type.charAt(0).toUpperCase() + type.slice(1) + '!',
            duration = 4000
        } = opts;

        const c = getContainer();

        // Build DOM
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.innerHTML = `
            <div class="toast-body">
                ${ICONS[type] || ICONS.success}
                <div class="toast-text">
                    <p class="toast-title">${title}</p>
                    <p class="toast-message">${message}</p>
                </div>
                <button class="toast-close" aria-label="Dismiss">&times;</button>
            </div>
            <div class="toast-progress" style="background: ${COLORS[type] || COLORS.success};">
                <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
            </div>
        `;

        // Style the accent border and progress track dynamically
        toast.style.setProperty('--toast-accent', COLORS[type] || COLORS.success);

        // Prepend so new toasts stack on top
        c.insertBefore(toast, c.firstChild);

        // Dismiss on close button
        toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));

        // Auto-dismiss
        const timer = setTimeout(() => dismissToast(toast), duration);

        // Pause progress on hover
        toast.addEventListener('mouseenter', () => {
            toast.querySelector('.toast-progress-bar').style.animationPlayState = 'paused';
            clearTimeout(timer);
        });
        toast.addEventListener('mouseleave', () => {
            const bar = toast.querySelector('.toast-progress-bar');
            bar.style.animationPlayState = 'running';
            // Remaining time estimate
            const remaining = parseFloat(getComputedStyle(bar).width) / toast.offsetWidth * duration;
            setTimeout(() => dismissToast(toast), remaining > 0 ? remaining : 500);
        });
    };

    function dismissToast(toast) {
        if (toast.classList.contains('toast--exiting')) return;
        toast.classList.add('toast--exiting');
        toast.addEventListener('animationend', () => {
            toast.remove();
        }, { once: true });
    }

})();
