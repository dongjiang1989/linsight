// Licensed to LinDB under one or more contributor
// license agreements. See the NOTICE file distributed with
// this work for additional information regarding copyright
// ownership. LinDB licenses this file to you under
// the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

package http

import (
	"fmt"
	"io/fs"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	httpcommon "github.com/lindb/common/pkg/http"

	"github.com/lindb/linsight"
	"github.com/lindb/linsight/constant"
	httppkg "github.com/lindb/linsight/pkg/http"
)

// handleStatic handles static resource request.
func handleStatic(e *gin.Engine) {
	// server static file
	staticFS, err := fs.Sub(linsight.StaticFS, "web/static")
	if err != nil {
		panic(err)
	} else {
		httpFS := http.FS(staticFS)
		urlPrefix := "/"
		fileserver := http.FileServer(httpFS)
		fileserver = http.StripPrefix(urlPrefix, fileserver)
		serveStatic := func() gin.HandlerFunc {
			return func(c *gin.Context) {
				if !httppkg.IsStaticResource(c) {
					return
				}
				if httppkg.IsLoginPage(c) {
					// check if use already signed
					_, isSigned := c.Get(constant.LinSightSigned)
					if isSigned {
						httpcommon.Redirect(c, constant.HomePage)
						c.Abort()
						return
					}
				}
				file, err := httpFS.Open(path.Join(urlPrefix, c.Request.URL.Path))
				if err == nil {
					_ = file.Close()
					fileserver.ServeHTTP(c.Writer, c.Request)
					c.Abort()
				} else {
					// FIXME: add log
					fmt.Println(err)
				}
			}
		}
		e.Use(serveStatic())

		// handle SAP(react-router) path
		e.NoRoute(func(c *gin.Context) {
			if httppkg.IsStaticResource(c) {
				// forwad index page
				c.Header("Content-Type", "text/html;charset=utf-8")
				c.String(http.StatusOK, linsight.IndexFile)
				return
			}

			// default 404 page not found
			httpcommon.NotFound(c)
		})
	}
}
