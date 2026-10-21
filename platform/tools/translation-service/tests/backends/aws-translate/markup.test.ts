import { describe, expect, it } from "@jest/globals";
import {
  fromAwsText,
  toAwsText,
} from "../../../src/backends/aws-translate/markup.js";

describe("toAwsText", () => {
  it("wraps each placeholder token in a do-not-translate span", () => {
    expect(toAwsText("Ask __PROT1__ or __PROT2__")).toBe(
      'Ask <span translate="no">__PROT1__</span> or <span translate="no">__PROT2__</span>',
    );
  });

  it("wraps adjacent tokens around translatable text", () => {
    expect(toAwsText("__PROT1__connection string__PROT2__")).toBe(
      '<span translate="no">__PROT1__</span>connection string<span translate="no">__PROT2__</span>',
    );
  });

  it("escapes characters that would otherwise read as markup", () => {
    expect(toAwsText("a < b && c > d")).toBe("a &lt; b &amp;&amp; c &gt; d");
  });

  it("leaves text without tokens or markup characters unchanged", () => {
    expect(toAwsText("Copy page")).toBe("Copy page");
  });
});

describe("fromAwsText", () => {
  it("removes do-not-translate spans and keeps the tokens", () => {
    expect(
      fromAwsText('Pregunte a <span translate="no">__PROT1__</span>'),
    ).toEqual({ ok: true, text: "Pregunte a __PROT1__" });
  });

  it("tolerates attribute quoting and whitespace variations", () => {
    expect(
      fromAwsText("<span translate=no> __PROT1__ </span> y <SPAN translate='no'>__PROT2__</SPAN>"),
    ).toEqual({ ok: true, text: "__PROT1__ y __PROT2__" });
  });

  it("unescapes named and numeric entities in a single pass", () => {
    expect(fromAwsText("a &lt; b &amp;&amp; &#39;c&#x27; &amp;lt;")).toEqual({
      ok: true,
      text: "a < b && 'c' &lt;",
    });
  });

  it("round-trips text through toAwsText", () => {
    const source = "Use __PROT1__ when x < 10 & y > 2";
    expect(fromAwsText(toAwsText(source))).toEqual({ ok: true, text: source });
  });

  it("rejects markup the source never contained and quotes what AWS returned", () => {
    expect(fromAwsText("Pregunte a <b>__PROT1__</b>")).toEqual({
      ok: false,
      message:
        'AWS Translate returned unexpected markup: "Pregunte a <b>__PROT1__</b>"',
    });
  });

  it("rejects a span whose token was altered", () => {
    const result = fromAwsText('<span translate="no">__PROT 1__</span>');
    expect(result.ok).toBe(false);
  });
});
