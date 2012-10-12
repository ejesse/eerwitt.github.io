/* description: Parses end executes simple site navigation commands. */

/* lexical grammar */
%lex
%s SAYING
%%

\s+                                     /* ignore whitespace */
[0-9]+("."[0-9]+)?\b                    { yytext = Number(yytext); return 'NUMBERTOK'; }
"say"                                   this.begin("SAYING")
<SAYING>[^\n]+                          { console.log(yytext); }
<SAYING>\n                              this.begin("INITIAL")

/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions: /* empty */ | expressions expression;

expression: test;

test:
  NUMBERTOK { console.log($1); };
