-- Inserção de um usuário administrador no banco de dados
INSERT INTO users (name, email, password, user_type) 
VALUES 
  (
    'Demaria-Admin',         -- Nome do usuário
    'admin@demaria.com',     -- Email do usuário admin
    '$2b$10$gH9Ty0Ni21T7P8Ar4vVtEuwpZqAfhSRwX3yoMD6MIUzNMiJTKf/mO',  -- Senha criptografada "demaria"
    2                        -- Tipo de usuário (ex: 1 = cliente, 2 = admin)
  )
ON CONFLICT (email) DO NOTHING;  -- Se o email já existir, não faz nada (evita erro de duplicação)
