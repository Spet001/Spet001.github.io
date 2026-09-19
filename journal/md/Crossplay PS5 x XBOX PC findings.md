# POC: BO2 Crossplay Relay (PS5 x MS Store PC)

Hoje decidi compartilhar algumas descobertas sobre um dos projetos mais audaciosos: o **Call of Duty: Black Ops II (T6) Crossplay Relay**. 
O objetivo deste projeto (codinome ZPGDK BO2CrossplayRelay) é criar uma ponte de tradução de protocolo entre a versão de PC (especificamente Win32 / GDK x64 MS Store) e os consoles (PS3 / PS5 e Xbox 360) através de *LAN System Link*.

Até o momento:
- **PS5 x GDK PC:** Funcionando perfeitamente!
- **Xbox 360 x GDK PC:** Em andamento (WIP). O Xbox 360 usa Native System Link com beacons XNet VHost (0x68 / 0x69) e estruturas Big-Endian XNADDR que dão bastante trabalho pra traduzir em tempo real.

## Como a Mágica Acontece?

O grande desafio de crossplay em jogos antigos é a incompatibilidade na camada de rede (Netchan) e nos beacons de descoberta. A arquitetura que construímos envolve:

1. **Sniffing e Injeção Npcap em Camada 2:** 
   Como o jogo nativo reserva a porta UDP `3074`, não conseguimos simplesmente rodar um socket no meio. A solução foi usar Npcap para interceptar e injetar pacotes raw Ethernet. Recalculamos inclusive o *checksum* RFC 768 sobre o pseudo-header IPv4 para enganar o stack TCP/IP extremamente restrito do console.

2. **Decapsulamento de Envelope e Tradução PS5:** 
   O PS4/PS5 possui mecanismos de Netfield challenge matching. Nós decapsulamos e traduzimos tudo em tempo real para que a engine no PC ache que está falando com outro PC, enquanto o PS5 jura de pé junto que o PC é só mais um console na mesma LAN.

3. **Sincronização Dinâmica em Memória:**
   No PC, usamos scripts Python (`online_relay.py`, `xbox360_discovery.py`, etc) para sincronizar Dvars (`mapname`, `gametype`, `hostname`) diretamente na memória, detectando dinamicamente a chave de sessão `XNKID` / `XNKEY`.

O projeto é muito experimental mas prova que, com engenharia reversa de pacotes suficiente, as barreiras de plataforma criadas há mais de 10 anos podem ser contornadas. Um super abraço pro pessoal da comunidade de modding (Xirus, rolltide11, AAA, Waffle e Heretics) que tornam isso possível.

Se você manja de análise de pacotes e engenharia reversa do T7 Durango/XONE ou PS4, sinta-se à vontade pra contribuir!
