#!/usr/bin/env python3
"""
Demonstração do Grok HR Tweets Searcher

Este script mostra exatamente como o prompt personalizado sobre RH funcionaria
sem precisar de uma API key real.
"""

from grok_ai_tweets import GrokTweetSearcher
import json
from datetime import datetime


def show_hr_search_demo():
    """Demonstra a busca por tweets de RH."""
    print("🚀 Grok HR Tweets Searcher - Demonstração")
    print("=" * 60)
    print(f"📅 Executado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Inicializar o searcher
    searcher = GrokTweetSearcher("demo_key")
    
    # Mostrar o prompt personalizado
    print("📝 PROMPT PERSONALIZADO:")
    print("-" * 50)
    prompt = searcher.create_search_prompt()
    print(prompt)
    print("-" * 50)
    print()
    
    # Mostrar o payload que seria enviado
    print("📦 PAYLOAD DA API:")
    print("-" * 50)
    payload = searcher.create_payload(prompt)
    print(json.dumps(payload, indent=2, ensure_ascii=False))
    print("-" * 50)
    print()
    
    # Simular resposta de sucesso
    print("✅ RESPOSTA SIMULADA:")
    print("-" * 50)
    print("""
1. @rh_brasil
   Tweet: "Dicas essenciais para gestão de pessoas em 2024! 📈 #RH #GestãoDePessoas"
   Likes: 2,345 | Comentários: 567
   Link: https://x.com/rh_brasil/status/123456789

2. @recursos_humanos_br
   Tweet: "Como reter talentos em tempos de alta rotatividade? Veja as estratégias..."
   Likes: 1,890 | Comentários: 234
   Link: https://x.com/recursos_humanos_br/status/987654321

3. @rh_startup_br
   Tweet: "Nossa empresa implementou home office híbrido e a satisfação aumentou 40%! 🏠💼"
   Likes: 1,567 | Comentários: 123
   Link: https://x.com/rh_startup_br/status/456789123

4. @gestao_pessoas_br
   Tweet: "5 tendências de RH para 2024 que você precisa conhecer! 🚀"
   Likes: 1,234 | Comentários: 89
   Link: https://x.com/gestao_pessoas_br/status/789123456

5. @recrutamento_br
   Tweet: "Processo seletivo digital: como otimizar e melhorar a experiência do candidato"
   Likes: 987 | Comentários: 156
   Link: https://x.com/recrutamento_br/status/321654987

[... continua até 30 tweets ordenados por likes ...]
""")
    print("-" * 50)
    print()
    
    print("📊 CONFIGURAÇÕES UTILIZADAS:")
    print("-" * 50)
    print(f"   • Modelo: grok-3")
    print(f"   • Idioma: Português (pt)")
    print(f"   • País: Brasil (BR)")
    print(f"   • Likes mínimos: 10")
    print(f"   • Quantidade: 30 tweets")
    print(f"   • Ordenação: Por engajamento (mais likes primeiro)")
    print()
    print("🔍 TERMOS DE BUSCA:")
    print("   • RH, recursos humanos, human resources")
    print("   • gestão de pessoas, people management")
    print("   • recrutamento, recruitment")
    print("   • seleção, selection")
    print("   • treinamento, training")
    print("   • desenvolvimento, development")
    print()
    print("✅ O script está pronto para uso!")
    print("💡 Para usar com API real, adicione sua chave em config.py")


if __name__ == "__main__":
    show_hr_search_demo()
