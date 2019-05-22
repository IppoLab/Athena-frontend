.. |frontend_master_build| image:: https://circleci.com/gh/ippolab/athena-frontend/tree/master.svg?style=svg
    :target: https://circleci.com/gh/ippolab/athena-frontend/tree/master

.. |frontend_dev_build| image:: https://circleci.com/gh/ippolab/athena-frontend/tree/dev.svg?style=svg
    :target: https://circleci.com/gh/ippoLab/athena-frontend/tree/dev

.. _yarn: https://yarnpkg.com

.. image:: https://img.shields.io/github/license/Naereen/StrapDown.js.svg
   :target: https://github.com/nikelwolf/Athena-frontend/blob/master/LICENSE

Build status
------------


+------------+-------------------------+
|   BRANCH   | BUILD STATUS            |
+============+=========================+
| master     | |frontend_master_build| |
+------------+-------------------------+
| dev        | |frontend_dev_build|    |
+------------+-------------------------+


Quickstart
----------

Your need yarn_ installed on your machine to bootsrap environment

Rename ``.env.example`` to ``.env`` and change values if need.

Use following commands to work with application::

    npm install   - install app dependencies
    npm run serve - run application from dev server with auto-reloading

If you need responses from api for application you can clone backend_ part and run it with ``docker``. More info in README_.

.. _backend: https://github.com/ippolab/athena-backend
.. _README: https://github.com/ippolab/athena-backend/blob/dev/README.rst

