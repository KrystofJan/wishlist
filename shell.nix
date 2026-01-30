{pkgs, ...}: {
  default = pkgs.mkShell {
    packages = with pkgs; [
      nodejs_22
      corepack
      pnpm
      nodePackages.typescript
      nodePackages.typescript-language-server
      prettier
      eslint
      tailwindcss
      tailwindcss-language-server
      sqlite
      python3
      python3Packages.setuptools
      pkg-config
    ];
    shellHook = ''
      export NPM_CONFIG_PREFIX="$HOME/.npm-global"
      mkdir -p "$NPM_CONFIG_PREFIX"
      export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"

      zsh
    '';
  };
}
