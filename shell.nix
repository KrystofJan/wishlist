{pkgs}: let
  python-with-packages = pkgs.python3.withPackages (ps: with ps; [
    setuptools
  ]);
in {
  default = pkgs.mkShell {
    packages = with pkgs; [
      nodejs_24
      corepack
      pnpm
      nodePackages.typescript
      nodePackages.typescript-language-server
      prettier
      eslint
      tailwindcss
      tailwindcss-language-server
      sqlite
      python-with-packages
      gnumake
      gcc
      pkg-config
    ];
    shellHook = ''
      export NPM_CONFIG_PREFIX="$HOME/.npm-global"
      mkdir -p "$NPM_CONFIG_PREFIX"
      export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"

      # Force node-gyp to use the nix-provided Python
      export PYTHON="${python-with-packages}/bin/python3"
      export npm_config_python="${python-with-packages}/bin/python3"

      zsh
    '';
  };
}
