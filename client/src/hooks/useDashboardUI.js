// src/hooks/useDashboardUI.js
//
// Converted from main.js (jQuery) to plain JS, wrapped in a React hook.
// Call this ONE time in your Dashboard/Layout component:
//
//   import useDashboardUI from '../hooks/useDashboardUI';
//   function Dashboard() {
//     useDashboardUI();
//     return ( ...your JSX... );
//   }
//
// NOTE: Things intentionally NOT included here because they need real
// React libraries instead of raw DOM hacks:
//   - BASIC/RESPONSIVE DATA TABLE  -> use `react-data-table-component` or `@tanstack/react-table`
//   - Product image Slick sliders  -> use `react-slick`
//   - Product image zoom           -> use `react-medium-image-zoom` or `react-zoom-pan-pinch`
//   - Bootstrap tooltip/popover    -> use `react-bootstrap` <OverlayTrigger>, or Bootstrap 5's
//                                      native JS (no jQuery needed) if you're using plain Bootstrap
//   - sidebar-scrollbar (slimScroll) -> use `simplebar-react` instead

import { useEffect } from "react";

export default function useDashboardUI() {
  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;
    const cleanupFns = [];

    /* ======== MOBILE OVERLAY ======== */
    if (isMobile()) {
      const toggles = document.querySelectorAll(".sidebar-toggle");
      const overlay = document.querySelector(".ec-tools-sidebar-overlay");

      const openOverlay = () => {
        document.body.style.overflow = "hidden";
        if (overlay) overlay.style.display = "block";
      };
      toggles.forEach((el) => el.addEventListener("click", openOverlay));

      const closeOverlay = (e) => {
        if (e.target.closest(".ec-tools-sidebar-overlay")) {
          overlay.style.display = "none";
          const body = document.getElementById("body");
          body?.classList.remove("sidebar-mobile-in");
          body?.classList.add("sidebar-mobile-out");
          document.body.style.overflow = "auto";
        }
      };
      document.addEventListener("click", closeOverlay);

      cleanupFns.push(() => {
        toggles.forEach((el) => el.removeEventListener("click", openOverlay));
        document.removeEventListener("click", closeOverlay);
      });

      /* ======== SIDEBAR TOGGLE FOR MOBILE ======== */
      const mobileToggle = (e) => {
        if (!e.target.closest(".sidebar-toggle")) return;
        e.preventDefault();
        const body = document.getElementById("body");
        const min = "sidebar-mobile-in";
        const minOut = "sidebar-mobile-out";
        if (body.classList.contains(min)) {
          body.classList.remove(min);
          body.classList.add(minOut);
        } else {
          body.classList.add(min);
          body.classList.remove(minOut);
        }
      };
      document.addEventListener("click", mobileToggle);
      cleanupFns.push(() => document.removeEventListener("click", mobileToggle));
    }

    /* ======== SIDEBAR MENU (expand/collapse submenus) ======== */
    const subMenuLinks = document.querySelectorAll(".sidebar .nav > .has-sub > a");
    const handleSubMenuClick = function () {
      const parent = this.parentElement;
      const siblings = [...parent.parentElement.children].filter((el) => el !== parent);

      siblings.forEach((sib) => {
        sib.classList.remove("expand");
        const collapse = sib.querySelector(".collapse");
        if (collapse) collapse.style.display = "none";
      });

      parent.classList.toggle("expand");
      const collapse = parent.querySelector(".collapse");
      if (collapse) {
        collapse.style.display = collapse.style.display === "block" ? "none" : "block";
      }
    };
    subMenuLinks.forEach((el) => el.addEventListener("click", handleSubMenuClick));
    cleanupFns.push(() =>
      subMenuLinks.forEach((el) => el.removeEventListener("click", handleSubMenuClick))
    );

    const nestedSubLinks = document.querySelectorAll(".sidebar .nav > .has-sub .has-sub > a");
    const handleNestedClick = function () {
      this.parentElement.classList.toggle("expand");
    };
    nestedSubLinks.forEach((el) => el.addEventListener("click", handleNestedClick));
    cleanupFns.push(() =>
      nestedSubLinks.forEach((el) => el.removeEventListener("click", handleNestedClick))
    );

    /* ======== SIDEBAR TOGGLE FOR DESKTOP LAYOUTS ======== */
    const body = document.getElementById("body");
    if (!isMobile() && body) {
      window.isMinified = window.isMinified ?? false;
      window.isCollapsed = window.isCollapsed ?? false;

      const toggler = document.getElementById("sidebar-toggler");
      const handleTogglerClick = () => {
        if (
          body.classList.contains("ec-sidebar-fixed-offcanvas") ||
          body.classList.contains("ec-sidebar-static-offcanvas")
        ) {
          toggler.classList.add("sidebar-offcanvas-toggle");
          toggler.classList.remove("sidebar-toggle");

          if (!window.isCollapsed) {
            body.classList.add("sidebar-collapse");
            window.isCollapsed = true;
            window.isMinified = false;
          } else {
            body.classList.remove("sidebar-collapse");
            body.classList.add("sidebar-collapse-out");
            setTimeout(() => body.classList.remove("sidebar-collapse-out"), 300);
            window.isCollapsed = false;
          }
        }

        if (body.classList.contains("ec-sidebar-fixed") || body.classList.contains("ec-sidebar-static")) {
          toggler.classList.add("sidebar-toggle");
          toggler.classList.remove("sidebar-offcanvas-toggle");

          if (!window.isMinified) {
            body.classList.remove("sidebar-collapse", "sidebar-minified-out");
            body.classList.add("sidebar-minified");
            window.isMinified = true;
            window.isCollapsed = false;
          } else {
            body.classList.remove("sidebar-minified");
            body.classList.add("sidebar-minified-out");
            window.isMinified = false;
          }
        }
      };

      if (toggler) {
        toggler.addEventListener("click", handleTogglerClick);
        cleanupFns.push(() => toggler.removeEventListener("click", handleTogglerClick));
      }

      if (window.innerWidth >= 768 && window.innerWidth < 992) {
        if (body.classList.contains("ec-sidebar-fixed") || body.classList.contains("ec-sidebar-static")) {
          body.classList.remove("sidebar-collapse", "sidebar-minified-out");
          body.classList.add("sidebar-minified");
          window.isMinified = true;
        }
      }
    }

    /* ======== RIGHT SIDEBAR ======== */
    const rightSidebarIn = "right-sidebar-in";
    const rightSidebarOut = "right-sidebar-out";

    const rightSidebarLinks = document.querySelectorAll(".nav-right-sidebar .nav-link");
    const handleRightSidebarClick = function () {
      if (!body.classList.contains(rightSidebarIn)) {
        body.classList.add(rightSidebarIn);
        body.classList.remove(rightSidebarOut);
      } else if (this.classList.contains("show")) {
        body.classList.add(rightSidebarOut);
        body.classList.remove(rightSidebarIn);
      }
    };
    rightSidebarLinks.forEach((el) => el.addEventListener("click", handleRightSidebarClick));
    cleanupFns.push(() =>
      rightSidebarLinks.forEach((el) => el.removeEventListener("click", handleRightSidebarClick))
    );

    const closeBtn = document.querySelector(".card-right-sidebar .close");
    const handleCloseClick = () => {
      body.classList.remove(rightSidebarIn);
      body.classList.add(rightSidebarOut);
    };
    if (closeBtn) {
      closeBtn.addEventListener("click", handleCloseClick);
      cleanupFns.push(() => closeBtn.removeEventListener("click", handleCloseClick));
    }

    if (window.innerWidth <= 1024 && body) {
      const togglerInClass = "right-sidebar-toggoler-in";
      const togglerOutClass = "right-sidebar-toggoler-out";
      body.classList.add(togglerOutClass);

      const rsTogglerBtns = document.querySelectorAll(".btn-right-sidebar-toggler");
      const handleRsToggle = () => {
        if (body.classList.contains(togglerOutClass)) {
          body.classList.add(togglerInClass);
          body.classList.remove(togglerOutClass);
        } else {
          body.classList.add(togglerOutClass);
          body.classList.remove(togglerInClass);
        }
      };
      rsTogglerBtns.forEach((el) => el.addEventListener("click", handleRsToggle));
      cleanupFns.push(() =>
        rsTogglerBtns.forEach((el) => el.removeEventListener("click", handleRsToggle))
      );
    }

    /* ======== DROPDOWN NOTIFY ======== */
    const dropdownToggle = document.querySelector(".notify-toggler");
    const dropdownNotify = document.querySelector(".dropdown-notify");

    if (dropdownToggle && dropdownNotify) {
      const handleNotifyToggle = () => {
        const visible = dropdownNotify.style.display !== "none" && dropdownNotify.offsetParent !== null;
        dropdownNotify.style.display = visible ? "none" : "block";
      };
      dropdownToggle.addEventListener("click", handleNotifyToggle);

      const handleOutsideClick = (e) => {
        if (!dropdownNotify.contains(e.target) && e.target !== dropdownNotify) {
          dropdownNotify.style.display = "none";
        }
      };
      document.addEventListener("mouseup", handleOutsideClick);

      cleanupFns.push(() => {
        dropdownToggle.removeEventListener("click", handleNotifyToggle);
        document.removeEventListener("mouseup", handleOutsideClick);
      });
    }

    /* ======== IMAGE CHANGE ON UPLOAD ======== */
    const handleImageUpload = (e) => {
      const target = e.target;
      if (!target.classList.contains("ec-image-upload")) return;
      if (!target.files || !target.files[0]) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const previewImg = target
          .closest(".ec-image-upload")
          ?.parentElement?.parentElement?.querySelector(".ec-preview .ec-image-preview");
        if (previewImg) {
          previewImg.src = ev.target.result;
          previewImg.style.display = "none";
          previewImg.style.opacity = 0;
          requestAnimationFrame(() => {
            previewImg.style.transition = "opacity 0.65s";
            previewImg.style.display = "block";
            previewImg.style.opacity = 1;
          });
        }
      };
      reader.readAsDataURL(target.files[0]);
    };
    document.body.addEventListener("change", handleImageUpload);
    cleanupFns.push(() => document.body.removeEventListener("change", handleImageUpload));

    /* ======== CATEGORY SLUG GENERATOR ======== */
    const generateSlug = (rawSlug) => {
      let slug = rawSlug.trim().toLowerCase();
      const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
      const to = "aaaaaeeeeeiiiiooooouuuunc------";
      for (let i = 0; i < from.length; i++) {
        slug = slug.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }
      slug = slug
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const slugInput = document.querySelector(".set-slug");
      if (slugInput) slugInput.value = slug;
    };

    const slugTitleInput = document.querySelector(".slug-title");
    const handlePaste = (e) => {
      const pasted = e.clipboardData.getData("text");
      generateSlug(pasted);
    };
    const handleKeypress = (e) => {
      generateSlug(e.target.value);
    };
    if (slugTitleInput) {
      slugTitleInput.addEventListener("paste", handlePaste);
      slugTitleInput.addEventListener("keyup", handleKeypress); // keyup instead of deprecated keypress
      cleanupFns.push(() => {
        slugTitleInput.removeEventListener("paste", handlePaste);
        slugTitleInput.removeEventListener("keyup", handleKeypress);
      });
    }

    /* ======== FOOTER YEAR ======== */
    const yearEl = document.getElementById("ec-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    /* ======== CLEANUP ON UNMOUNT ======== */
    return () => cleanupFns.forEach((fn) => fn());
  }, []);
}