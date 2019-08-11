#### 基本概念

1.Fork  克隆到其他分支

2.pull request 分支向其他仓库提交数据，把自己修改应用到别人的代码仓库 

3.repositories 仓库

#### 一些常用git命令

git init(创建仓库)

git status(查看仓库的状态)

git diff 文件名 (这次相较上次修改了哪些内容)

git add 文件名 (将添加的文件放到本地暂存区中)

git commit (将栈存区内容提交到代码区中)

git clone git地址(将远程仓库的代码克隆到本地)

git branch 查看当前分支

git checkout 切换分支

git rm <file> # 从版本库中删除文件

git reset <file> # 从暂存区恢复到工作文件

git pull # 抓取远程仓库所有分支更新并合并到本地

#### 如何从 git 中删除文件，而不将其从文件系统中删除？

如果你在 git add 过程中误操作，你最终会添加不想提交的文件。但是，git rm 则会把你的文件从你暂存区（索引）和文件系统（工作树）中删除，这可能不是你想要的。

换成 git reset 操作：

git reset filename          # or

echo filename >> .gitingore # add it to .gitignore to avoid re-adding it

上面意思是，git reset <paths> 是 git add <paths> 的逆操作。

#### 说明新建一个 GIT功能分支 的步骤，提供每个步骤的指令，并对指令进行说明。

答：Git branch name     创建名字为name的branch

Git checkout xxx_dev    切换到名字为xxx_dev的分支

Git pull    从远程分支拉取代码到本地分支

Git checkout -b main_furture_xxx    创建并切换到main_furture_xxx

Git push origin main_furture_xxx    执行推送的操作，完成本地分支向远程分支的同步

#### 我们在本地工程常会修改一些配置文件，这些文件不需要被提交，而我们又不想每次执行git status时都让这些文件显示出来，我们该如何操作？

答：在Git工作区的跟目录下创建一个特殊的.gitignore文件，然后把忽略的文件名编辑进去，Git就会自动忽略这些文件。

#### git提交代码时候写错commit信息后，如何重新设置commit信息？

答：可以通过Git commit --amend 来对本次commit进行修改。

#### SVN与Git优缺点比较

1．SVN优缺点

优点： 

1、 管理方便，逻辑明确，符合一般人思维习惯。 

2、 易于管理，集中式服务器更能保证安全性。 

3、 代码一致性非常高。 

4、 适合开发人数不多的项目开发。 

缺点： 

1、 服务器压力太大，数据库容量暴增。 

2、 如果不能连接到服务器上，基本上不可以工作，看上面第二步，如果服务器不能连接上，就不能提交，还原，对比等等。 

3、 不适合开源开发（开发人数非常非常多，但是Google app engine就是用svn的）。但是一般集中式管理的有非常明确的权限管理机制（例如分支访问限制），可以实现分层管理，从而很好的解决开发人数众多的问题。

 

2．Git优缺点

优点： 

1、适合分布式开发，强调个体。 

2、公共服务器压力和数据量都不会太大。 

3、速度快、灵活。 

4、任意两个开发者之间可以很容易的解决冲突。 

5、离线工作。 

缺点： 

1、学习周期相对而言比较长。 

2、不符合常规思维。 

3、代码保密性差，一旦开发者把整个库克隆下来就可以完全公开所有代码和版本信息。