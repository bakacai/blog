### 哟👋~大家好，我是很菜的菜菜，你也可以简单地叫我菜菜。

## 这是什么？

这里是菜菜的博客，可能会记录我的一些包括但不仅限于技术以及日常的内容，比如有可能还会出现我的抽风文学x

## 我怎么看？

我已经将其部署在了个人服务器上，你可以直接[点击连接](https://bakacai.life)进行阅读。当然，因为我的博客是使用 hexo 构建的，并且在这个 repo 中已经包括了所有的内容，所以如果你乐意，也可以自行构建后阅读，甚至你还可以直接在 [`source/_posts`](https://github.com/bakacai/blog/tree/init/source/_posts) 中找到文章直接阅读md文件（x

## 如何构建？

> 除非真的有需求，否则更建议你直接阅读我构建后发布的版本

1. 参考[hexo官网提供的教程](https://hexo.io/zh-cn/docs/index.html)安装 `git` 、 `nodejs` 、 `hexo`

2. 克隆(clone)该仓库到本地 **注意该项目使用了 submodules 的形式来加载[我自行修改过的主题](https://github.com/bakacai/hexo-theme-butterfly-mod)，所以clone时请加入 `--recurse-submodules` 参数，否则 `themes/butterfly` 将为空文件夹，后续 hexo 编译操作无法完成**
    >如果忘记添加该参数，可以使用 `git submodule update --init --recursive` 来初始化子模块

3. 进入项目目录，使用 `pnpm install` 完成 node_modules 的安装

4. 使用 `hexo server` 可以免构建直接本地阅读内容；使用 `hexo generate` 可以构建静态版本，编译好的静态文件可以在 public 目录中找到。

## 协议是啥？

![GitHub](https://img.shields.io/github/license/bakacai/blog)

<img style="width: 96px" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png"></img>

该仓库中位于 `source/_posts` 的文件除特别声明外，均采用 [CC BY-NC-ND 4.0 DEED](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans) （创意共享4.0许可证：自由转载-非商用-非衍生-转载请注明出处）协议进行分享。除此路径外的其余文件均采用[Apache 2.0许可证](https://opensource.org/licenses/Apache-2.0)进行授权。

基于该开源协议的影响，您可以自行修改除 `source/_posts` 外的所有代码（该目录中的文件只能选择删除，或标记文件内容来源自**很菜的菜菜**，且不能随意修改其内容，不能用于商业用途，**当该目录下的文件均被删除后，该仓库便只受Apache 2.0协议的限制**）

