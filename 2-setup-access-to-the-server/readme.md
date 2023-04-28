### tasks

generating ssh keys

```sh
ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/serhii/.ssh/id_rsa): /home/serhii/projects/my_custom_own_projects/custom_tasks/task_to_learn_diff_fields_of_it/examples/custom_rsa
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/serhii/projects/my_custom_own_projects/custom_tasks/task_to_learn_diff_fields_of_it/examples/custom_rsa
Your public key has been saved in /home/serhii/projects/my_custom_own_projects/custom_tasks/task_to_learn_diff_fields_of_it/examples/custom_rsa.pub
The key fingerprint is:
SHA256:+AzljKIdky0gEvoAGV8yg7kOCjOkg6LByQC7NG6SxJ0 serhii@working-laptop
The key's randomart image is:
+---[RSA 3072]----+
|*=+ .            |
|O=.=.            |
|&*+E    .        |
|^X.. o *         |
|@B. * = S        |
|=. o = +         |
|  . .   o        |
|                 |
|                 |
+----[SHA256]-----+
```

run ubuntu server [multipass](https://multipass.run/)

1. installing

```
$ sudo snap install multipass
[sudo] password for serhii: 
multipass 1.11.0 from Canonical✓ installed
```


ensuring that pseudodo-tty is allocated

```sh
serhii@working-laptop:~/projects/my_custom_own_projects/custom_tasks/task_to_learn_diff_fields_of_it/examples/2-setup-access-to-the-server (master)
ssh -t ubuntu@10.63.182.16
The authenticity of host '10.63.182.16 (10.63.182.16)' can't be established.
ED25519 key fingerprint is SHA256:fmRlM2AhUqh2cc69OIvpkrbOUFl/oGv3AhSFtYHP0oY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.63.182.16' (ED25519) to the list of known hosts.
Welcome to Ubuntu 18.04.6 LTS (GNU/Linux 4.15.0-209-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Apr 28 16:16:22 EEST 2023

  System load:  0.0               Processes:           87
  Usage of /:   24.9% of 4.67GB   Users logged in:     1
  Memory usage: 13%               IP address for ens3: 10.63.182.16
  Swap usage:   0%


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status

New release '20.04.6 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


Last login: Fri Apr 28 16:01:49 2023 from 10.63.182.1
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.
ubuntu@developed-chihuahua:~$ 
```

### links

https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server

