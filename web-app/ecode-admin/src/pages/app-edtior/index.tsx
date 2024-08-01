import { FC, useRef, useState } from 'react';
import { AlertComponent, ToastComponent, ContextMenu, SchemaObject } from 'amis';
import { Editor } from 'amis-editor';
import 'amis/lib/themes/default.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import 'amis-ui/lib/themes/antd.css';
import { Button } from '@arco-design/web-react';
interface Props {}
// 编辑条件表达式的时候的选项
const schemas = [
  {
    type: 'object',
    properties: {
      amisUser: {
        type: 'object',
        title: '用户信息',
        properties: {
          id: {
            type: 'string',
            title: '用户ID'
          },
          name: {
            type: 'string',
            title: '用户名'
          },
          email: {
            type: 'string',
            title: '邮箱'
          },
          nickName: {
            type: 'string',
            title: '昵称'
          },
          phone: {
            type: 'string',
            title: '手机号'
          },
          avatar: {
            type: 'string',
            title: '用户头像'
          }
        }
      },
      amisApp: {
        type: 'object',
        title: '应用信息',
        properties: {
          id: {
            type: 'string',
            title: '应用ID'
          },
          name: {
            type: 'string',
            title: '应用名称'
          },
          logo: {
            type: 'string',
            title: '应用Logo'
          },
          env: {
            type: 'string',
            title: '当前运行环境'
          }
        }
      },
      amisCompany: {
        type: 'object',
        title: '组织信息',
        properties: {
          id: {
            type: 'string',
            title: '组织ID'
          },
          name: {
            type: 'string',
            title: '组织名称'
          },
          logo: {
            type: 'string',
            title: '组织Logo'
          },
          key: {
            type: 'string',
            title: '组织标识'
          }
        }
      },
      'window:location': {
        type: 'object',
        title: '浏览器变量',
        properties: {
          href: {
            type: 'string',
            title: 'href'
          },
          origin: {
            type: 'string',
            title: 'origin'
          },
          protocol: {
            type: 'string',
            title: 'protocol'
          },
          host: {
            type: 'string',
            title: 'host'
          },
          hostname: {
            type: 'string',
            title: 'hostname'
          },
          port: {
            type: 'string',
            title: 'port'
          },
          pathname: {
            type: 'string',
            title: 'pathname'
          },
          search: {
            type: 'string',
            title: 'search'
          },
          hash: {
            type: 'string',
            title: 'hash'
          }
        }
      }
    }
  },
  {
    type: 'object',
    properties: {
      __query: {
        title: '页面入参',
        type: 'object',
        required: [],
        properties: {
          name: {
            type: 'string',
            title: '用户名'
          }
        }
      },
      __page: {
        title: '页面变量',
        type: 'object',
        required: [],
        properties: {
          num: {
            type: 'number',
            title: '数量'
          }
        }
      }
    }
  }
];
//
// const variableSchemas = {
//   type: 'object',
//   $id: 'appVariables',
//   properties: {
//     ProductName: {
//       type: 'string',
//       title: '产品名称',
//       default: '对象存储'
//     },
//     Banlance: {
//       type: 'number',
//       title: '账户余额',
//       default: '0.00'
//     },
//     ProductNum: {
//       type: 'integer',
//       title: '产品数量',
//       default: '0.00'
//     },
//     isOnline: {
//       type: 'boolean',
//       title: '是否线上环境',
//       default: 'false'
//     },
//     ProductList: {
//       type: 'array',
//       items: {
//         type: 'string',
//         title: '产品名称'
//       },
//       title: '产品列表',
//       default: '["BOS", "CFS", "PFS", "CloudFlow", "MongoDB"]'
//     },
//     PROFILE: {
//       type: 'object',
//       title: '个人信息',
//       properties: {
//         FirstName: {
//           type: 'string',
//           title: '名字'
//         },
//         Age: {
//           type: 'integer',
//           title: '年龄'
//         },
//         Address: {
//           type: 'object',
//           title: '地址',
//           required: ['street', 'postcode'],
//           properties: {
//             street: {
//               type: 'string',
//               title: '街道名称'
//             },
//             postcode: {
//               type: 'number',
//               title: '邮编'
//             }
//           }
//         }
//       }
//     }
//   },
//   default: {
//     ProductName: 'BCC',
//     Banlance: 1234.888,
//     ProductNum: 10,
//     isOnline: false,
//     ProductList: ['BCC', 'BOS', 'VPC'],
//     PROFILE: {
//       FirstName: 'Amis',
//       Age: 18,
//       Address: {
//         street: 'ShangDi',
//         postcode: 100001
//       }
//     }
//   }
// };
const variableDefaultData = {
  appVariables: {
    ProductName: 'BCC',
    Banlance: 1234.888,
    ProductNum: 10,
    isOnline: false,
    ProductList: ['BCC', 'BOS', 'VPC'],
    PROFILE: {
      FirstName: 'Amis',
      Age: 18,
      Address: {
        street: 'ShangDi',
        postcode: 100001
      }
    }
  }
};
// 内存变量
// const variables = [
//   {
//     name: 'appVariables',
//     title: '内存变量',
//     parentId: 'root',
//     order: 1,
//     schema: variableSchemas
//   }
// ];

// const EditorType = {
//   EDITOR: 'editor',
//   MOBILE: 'mobile',
//   FORM: 'form'
// };

// const editorLanguages = [
//   {
//     label: '简体中文',
//     value: 'zh-CN'
//   },
//   {
//     label: 'English',
//     value: 'en-US'
//   }
// ];
const defaultSchema: SchemaObject = {
  type: 'page',
  // label: '编辑2',
  // actionType: 'dialog',
  // level: 'link',
  // dialog: {
  //   title: '编辑3',
  //   body: {
  //     type: 'form',
  //     api: 'xxx/update',
  //     body: [
  //       {
  //         name: 'id',
  //         label: 'ID',
  //         id: 'u:b964ae6a18db',
  //         type: 'input-text'
  //       },
  //       {
  //         name: 'engine',
  //         label: '渲染引擎',
  //         id: 'u:5bd838561553',
  //         type: 'input-text'
  //       }
  //     ]
  //   }
  // },
  id: 'u:3a10e1e160b4'
};
const AppEditor: FC<Props> = () => {
  const curTheme = 'cxd'; // 默认使用cxd主题
  const [schema, setSchema] = useState<SchemaObject>(defaultSchema);
  const [isPreview, setIsPreview] = useState(false);
  const onChange = (value: SchemaObject) => {
    console.log('onchange', value);
    setSchema(value);
  };
  const editorRef = useRef<Editor | null>(null);

  const onSave = () => {
    console.log(`保存`, schema);
    console.log(editorRef.current?.context);
  };
  return (
    <div className='h-screen overflow-y-auto flex flex-col'>
      <div className='h-10  flex justify-between'>
        <div className='Editor-title'>Ecode</div>
        <Button
          type='primary'
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? '退出预览' : '查看预览'}
        </Button>
        <Button
          type='primary'
          onClick={onSave}
        >
          保存
        </Button>
      </div>
      <Editor
        ref={editorRef}
        className='flex-1'
        preview={isPreview}
        value={defaultSchema}
        schemas={schemas}
        onChange={onChange}
        // variables={variables}
        i18nEnabled={false}
        theme='cxd'
        // onSave={onSave}
        showCustomRenderersPanel={true}
        $schemaUrl={`${location.protocol}//${location.host}/schema.json`}
        actionOptions={{
          showOldEntry: true
        }}
        // amisEnv={
        //   {
        //     variable: {
        //       id: 'appVariables',
        //       namespace: 'appVariables',
        //       schema: variableSchemas,
        //       data: variableDefaultData
        //     }
        //   } as any
        // }
        ctx={{
          __page: {
            num: 2
          },
          ...variableDefaultData
        }}
      />
      <ToastComponent theme={curTheme} />
      <AlertComponent theme={curTheme} />
      <ContextMenu theme={curTheme} />
    </div>
  );
};
export default AppEditor;
