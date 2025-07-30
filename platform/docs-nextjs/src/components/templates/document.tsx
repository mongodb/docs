import React from "react";
import MainColumn from "./main-column";
import RightColumn from "./right-column";
import documentStyling from "./document.module.scss";

export default function DocumentTemplate({ children }: {
  children?: React.ReactNode;
}) {

  return (
    <div className={(documentStyling.document)}>
      <MainColumn className={(documentStyling['main-column'])}>
        <div className="body">
          {/* TODO: breadcrumbs components */}
          {/* <Breadcrumbs siteTitle={title} slug={slug} /> */}
          {children}
          {/* TODO: prev next components */}
          {/* {showPrevNext && (
            <InternalPageNav slug={slug} slugTitleMapping={slugToBreadcrumbLabel ?? {}} toctreeOrder={toctreeOrder} />
          )} */}
        </div>
      </MainColumn>
      <RightColumn hasDismissibleSkillsCard={false}>
        <div>CONTENTS HERE</div>

      </RightColumn>
    </div>
  );
}