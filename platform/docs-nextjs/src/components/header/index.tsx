"use client";

import React from "react";
import { UnifiedNav } from "@mdb/consistent-nav";
import headingStyles from "./header.module.scss";

const Header = () => {
  const unifiedNavProperty = 'DOCS';
  // TODO: language selection
  return (
    <header className={headingStyles.header}>
      <UnifiedNav
        fullWidth={true}
        hideSearch={true}
        position="relative"
        property={{ name: unifiedNavProperty, searchParams: [] }}
        showLanguageSelector={true}
        // onSelectLocale={onSelectLocale}
        locale={"en-us"}
        enabledLocales={["en-us"]}
        darkMode={false} />
    </header>
  );
};

export default Header;